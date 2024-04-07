import React from "react";
import * as Components from "./Components";
import power from "./power.png";
import logo from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
function SelectMethod() {
  //method to handle Link Method
  const navigate = useNavigate();

  const [signIn, toggle] = React.useState(true);
  return (
    <>
      <div className="relative">
        <div className="flex items-center absolute top-0 left-0 w-full">
          <h2 className="text-yellow-400 font-bold  animate-pulse fancy-text">
            Powered by
          </h2>
          <img
            src={logo}
            alt=""
            className="w-10 h-10 ml-2 filter drop-shadow-md"
          />
        </div>
      </div>

      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title></Components.Title>
            {/* <Components.Input type='text' placeholder='Name' />
                     <Components.Input type='email' placeholder='Email' />
                     <Components.Input type='password' placeholder='Password' /> */}
            <Link to="/payment-eth">
              <Components.Button>Proceed with native method</Components.Button>
            </Link>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form>
            {/* <Components.Title>Sign in</Components.Title> */}
            {/* <Components.Input type='email' placeholder='Email' />
                      <Components.Input type='password' placeholder='Password' /> */}
            {/* <Components.Anchor href='#'>Forgot your password?</Components.Anchor> */}
            <Link to="/payment-link">
              <Components.Button>Proceed with Link</Components.Button>
            </Link>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Select your Payment Method!</Components.Title>
              <Components.Paragraph>
                {/* To keep connected with us please login with your personal info */}
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Link
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Select your payment method</Components.Title>
              <Components.Paragraph>
                {/* Enter Your personal details and start journey with us */}
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Native
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </>
  );
}

export default SelectMethod;
