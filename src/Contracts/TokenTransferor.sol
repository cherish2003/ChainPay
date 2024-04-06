// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple contract for transferring tokens across chains.
contract TokenTransferor is OwnerIsCreator {
    using SafeERC20 for IERC20;

    // Custom errors to provide more descriptive revert messages.
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); // Used to make sure contract has enough balance to cover the fees.
    error NothingToWithdraw(); // Used when trying to withdraw Ether but there's nothing to withdraw.
    error FailedToWithdrawEth(address owner, address target, uint256 value); // Used when the withdrawal of Ether fails.
    error DestinationChainNotAllowlisted(uint64 destinationChainSelector); // Used when the destination chain has not been allowlisted by the contract owner.
    error InvalidReceiverAddress(); // Used when the receiver address is 0.
    error InsufficientUserRole(); // Used when a user role is insufficient to perform an action.

    // Event emitted when the tokens are transferred to an account on another chain.
    event TokensTransferred(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        address token, // The token address that was transferred.
        uint256 tokenAmount, // The token amount that was transferred.
        address feeToken, // the token address used to pay CCIP fees.
        uint256 fees // The fees paid for sending the message.
    );


    // Enum to define customer categories.
    enum CustomerCategory { Regular, Occasional, OneTime, Inactive, New, HighValue, LowValue }

    // Mapping to keep track of allowlisted destination chains.
    mapping(uint64 => bool) public allowlistedChains;

    // Mapping to store user roles.

    // Mapping to store user details.
    struct UserDetails {
        string username;
        string email;
        uint256 transactionCount;
        uint256 transactionVolume;
        uint256 lastTransactionTimestamp;
    }
    mapping(address => UserDetails) public userDetails;

    IRouterClient private s_router;

    IERC20 private s_linkToken;

    /// @notice Constructor initializes the contract with the router address.
    /// @param _router The address of the router contract.
    /// @param _link The address of the link contract.
    constructor(address _router, address _link) {
        s_router = IRouterClient(_router);
        s_linkToken = IERC20(_link);
    }

    // Modifier that checks if the chain with the given destinationChainSelector is allowlisted.
    modifier onlyAllowlistedChain(uint64 _destinationChainSelector) {
        require(allowlistedChains[_destinationChainSelector], "Destination chain not allowlisted");
        _;
    }

    // Modifier that checks the receiver address is not 0.
    modifier validateReceiver(address _receiver) {
        require(_receiver != address(0), "Invalid receiver address");
        _;
    }

   

    // Modifier that updates user transaction history after transfer.
    modifier updateUserTransactionHistory(address _user, uint256 _amount) {
        UserDetails storage user = userDetails[_user];
        user.transactionCount++;
        user.transactionVolume += _amount;
        user.lastTransactionTimestamp = block.timestamp;
        _;
    }

    /// @notice Retrieve the CCIP token balance held by the contract.
    /// @return The CCIP token balance.
    function ccipTokenBalance() public view returns (uint256) {
        return s_linkToken.balanceOf(address(this));
    }

    /// @dev Updates the allowlist status of a destination chain for transactions.
    /// @param _destinationChainSelector The selector of the destination chain to be updated.
    /// @param allowed The allowlist status to be set for the destination chain.
    function allowlistDestinationChain(uint64 _destinationChainSelector, bool allowed) external onlyOwner {
        allowlistedChains[_destinationChainSelector] = allowed;
    }

    /// @notice Transfer tokens to receiver on the destination chain.
    /// @notice pay in LINK.
    /// @notice the token must be in the list of supported tokens.
    /// @notice This function can only be called by the owner.
    /// @dev Assumes your contract has sufficient LINK tokens to pay for the fees.
    /// @param _destinationChainSelector The identifier (aka selector) for the destination blockchain.
    /// @param _receiver The address of the recipient on the destination blockchain.
    /// @param _token token address.
    /// @param _amount token amount.
    /// @return messageId The ID of the message that was sent.
    function transferTokensPayLINK(
        uint64 _destinationChainSelector,
        address _receiver,
        address _token,
        uint256 _amount
    )
        external
        onlyAllowlistedChain(_destinationChainSelector)
        validateReceiver(_receiver)
        returns (bytes32 messageId)
    {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        //  address(linkToken) means fees are paid in LINK
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(
            _receiver,
            _token,
            _amount,
            address(s_linkToken)
        );

        // Get the fee required to send the message
        uint256 fees = s_router.getFee(
            _destinationChainSelector,
            evm2AnyMessage
        );

        if (fees > s_linkToken.balanceOf(address(this)))
            revert NotEnoughBalance(s_linkToken.balanceOf(address(this)), fees);

        // approve the Router to transfer LINK tokens on contract's behalf. It will spend the fees in LINK
        s_linkToken.approve(address(s_router), fees);

        // approve the Router to spend tokens on contract's behalf. It will spend the amount of the given token
        IERC20(_token).approve(address(s_router), _amount);

        // Send the message through the router and store the returned message ID
        messageId = s_router.ccipSend(
            _destinationChainSelector,
            evm2AnyMessage
        );

        // Emit an event with message details
        emit TokensTransferred(
            messageId,
            _destinationChainSelector,
            _receiver,
            _token,
            _amount,
            address(s_linkToken),
            fees
        );

        // Update user transaction history
        userDetails[msg.sender].transactionCount++;
        userDetails[msg.sender].transactionVolume += _amount;
        userDetails[msg.sender].lastTransactionTimestamp = block.timestamp;

        // Return the message ID
        return messageId;
    }

    /// @notice Construct a CCIP message.
    /// @dev This function will create an EVM2AnyMessage struct with all the necessary information for tokens transfer.
    /// @param _receiver The address of the receiver.
    /// @param _token The token to be transferred.
    /// @param _amount The amount of the token to be transferred.
    /// @param _feeTokenAddress The address of the token used for fees.
    /// @return Client.EVM2AnyMessage Returns an EVM2AnyMessage struct which contains information for sending a CCIP message.
    function _buildCCIPMessage(
        address _receiver,
        address _token,
        uint256 _amount,
        address _feeTokenAddress
    ) private pure returns (Client.EVM2AnyMessage memory) {
        // Set the token amounts
        // Create an array of EVMTokenAmount structs to store the token amounts
        Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);

        // Assign values to the first element of the array
        tokenAmounts[0] = Client.EVMTokenAmount({
            token: _token,
            amount: _amount
        });

        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        return
            Client.EVM2AnyMessage({
                receiver: abi.encode(_receiver), // ABI-encoded receiver address
                data: "", // No data
                tokenAmounts: tokenAmounts, // The amount and type of token being transferred
                extraArgs: Client._argsToBytes(
                    // Additional arguments, setting gas limit to 0 as we are not sending any data
                    Client.EVMExtraArgsV1({gasLimit: 0})
                ),
                // Set the feeToken to a feeTokenAddress, indicating specific asset will be used for fees
                feeToken: _feeTokenAddress
            });
    }

    /// @notice Allows the contract owner to withdraw the entire balance of Ether from the contract.
    /// @dev This function reverts if there are no funds to withdraw or if the transfer fails.
    /// It should only be callable by the owner of the contract.
    /// @param _beneficiary The address to which the Ether should be transferred.
    function withdrawEther(address _beneficiary) external onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "Nothing to withdraw");
        (bool sent, ) = _beneficiary.call{value: amount}("");
        require(sent, "Failed to withdraw Ether");
    }

    /// @notice Allows the owner of the contract to withdraw all tokens of a specific ERC20 token.
    /// @dev This function reverts with a 'NothingToWithdraw' error if there are no tokens to withdraw.
    /// @param _beneficiary The address to which the tokens will be sent.
    /// @param _token The contract address of the ERC20 token to be withdrawn.
    function withdrawToken(
        address _beneficiary,
        address _token
    ) external onlyOwner {
        uint256 amount = IERC20(_token).balanceOf(address(this));
        require(amount > 0, "Nothing to withdraw");
        IERC20(_token).safeTransfer(_beneficiary, amount);
    }

    /// @notice Updates the role of a user.
    /// @dev This function can only be called by the contract owner.
    /// @param _user The address of the user whose role is to be updated.
    /// @param _newRole The new role to be assigned to the user.

    /// @notice Allows the contract owner to set user details.
    /// @dev This function can only be called by the contract owner.
    /// @param _user The address of the user whose details are to be updated.
    /// @param _username The new username for the user.
    /// @param _email The new email for the user.
    function setUserDetails(address _user, string memory _username, string memory _email) external onlyOwner {
        userDetails[_user] = UserDetails(_username, _email, 0, 0, 0);
    }

    /// @notice Retrieves the role of a user.
    /// @param _user The address of the user whose role is to be retrieved.
    /// @return The role of the user.
   

    /// @notice Retrieves the details of a user.
    /// @param _user The address of the user whose details are to be retrieved.
    /// @return The username and email of the user.
    function getUserDetails(address _user) external view returns (string memory, string memory) {
        return (userDetails[_user].username, userDetails[_user].email);
    }

    /// @notice Retrieves the category of a customer based on their transaction behavior.
    /// @param _user The address of the user whose category is to be retrieved.
    /// @return The category of the user.
    function getCustomerCategory(address _user) external view returns (CustomerCategory) {
        UserDetails memory user = userDetails[_user];

        // Determine the customer category based on transaction behavior
        if (user.transactionCount == 0) {
            return CustomerCategory.New;
        } else if (user.transactionCount <= 5) {
            return CustomerCategory.OneTime;
        } else if (user.transactionCount <= 10) {
            return CustomerCategory.Occasional;
        } else if (user.transactionCount <= 20) {
            return CustomerCategory.Regular;
        } else if (user.transactionCount <= 50) {
            return CustomerCategory.HighValue;
        } else {
            return CustomerCategory.Inactive;
        }
    }
}
