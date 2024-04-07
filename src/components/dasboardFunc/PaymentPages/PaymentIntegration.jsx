import CodeBlock from "./CodeBlock";

function PaymentIntegration() {
  return (
    <>
      <h1 className="text-5xl mb-10 text-white  sm:text-5xl lg:text-5xl  tracking-wide">
        Integrate
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
          {" "}
          chainPay effortlessly
        </span>
      </h1>

      <CodeBlock
        code={`
// HTML
<input type="text" id="recipientAddress" placeholder="Recipient Address">
<input type="number" id="amount" placeholder="Amount">
<button onclick="transferTokens()">Transfer Tokens</button>

// JavaScript
<script src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js" type="text/javascript"></script>
<script>
  async function transferTokens() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const abi = [...]; // ABI of your contract
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const recipientAddress = document.getElementById('recipientAddress').value;
    const amount = document.getElementById('amount').value;

    try {
      // Call transferTokensPayLINK function
      const tx = await contract.transferTokensPayLINK(recipientAddress, amount);
      await tx.wait();
      alert('Tokens transferred successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to transfer tokens');
    }
  }
</script>
`}
      />
    </>
  );
}

export default PaymentIntegration;
