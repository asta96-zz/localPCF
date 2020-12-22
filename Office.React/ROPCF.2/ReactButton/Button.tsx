import * as React from "react";
import * as ReactDOM from "react-dom";
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

export const ButtonDefaultExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  return (
    <Stack horizontal tokens={stackTokens}>
      <DefaultButton text="Standard" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
      <PrimaryButton text="Primary" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
    </Stack>
  );
};

// class Employee extends React.Component {
//     state={count:0};
//     addEmployee = () => {
//         this.setState({counter:this.state.count+1});
//     }
//     render() {
//       return <div>
//           <h2>Employee Component...</h2>
//           <button onClick={this.addEmployee}>Add Employee</button>  
//           <p>
//               <label>Add Employee Button is Clicked : <b>{this.state.count}</b></label></p>        
//       </div>
//     }
//   }

//   const element1=<Employee></Employee>
//   ReactDOM.render(element1,document.getElementById("root"));

function _alertClicked(): void {
  alert('Clicked');
}
