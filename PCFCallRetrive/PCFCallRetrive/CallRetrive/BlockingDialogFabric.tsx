import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IDialogBlockingExampleState {
  hideDialog: boolean;
}

export class DialogBlockingExample extends React.Component<any, IDialogBlockingExampleState> {

  public state: IDialogBlockingExampleState = { 
    hideDialog: true,
  };

  constructor(props: any) {
    super(props);
  }

  public render() : JSX.Element {

    let showDialog = this._showDialog.bind(this);
    let closeDialog = this._closeDialog.bind(this);

    return (
      <div>
        <DefaultButton secondaryText="Opens the Blocking Dialog" onClick={showDialog} text={this.props.buttonText} />
        <Dialog
          className="BlockingDialogClass"
          hidden={this.state.hideDialog}
          onDismiss={closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: this.props.title,
            subText: this.props.subText
          }}
          modalProps={{
            isBlocking: true,
            styles: { main: { maxWidth: 450 } }
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={closeDialog} text="OK" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }

  private _showDialog = (): void => {
    this.setState({ hideDialog: false });
  };

  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  };
}