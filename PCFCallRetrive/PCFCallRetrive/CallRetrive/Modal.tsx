import * as React from 'react';
import { Modal, IDragOptions } from 'office-ui-fabric-react/lib/Modal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ResponsiveMode, TooltipOverflowMode } from 'office-ui-fabric-react';

export interface IModalBasicExampleState {
  showModal: boolean;
  isDraggable: boolean;
  showModalFunction: FunctionConstructor;
}

export class ModalApp extends React.Component<any, IModalBasicExampleState> {
    public state: IModalBasicExampleState = {
      showModal: false,
      isDraggable: false,
      showModalFunction: this.props.showModalFunction
    };
    
    constructor(props: any){
      super(props);

      //this.state.showModal = props.showModal;
    }
    

  // Use getId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings without getId() and manually ensure uniqueness.)
  private _titleId: string = getId('title');
  private _subtitleId: string = getId('subText');
  private _dragOptions: IDragOptions = {
      moveMenuItemText: 'Move',
      closeMenuItemText: 'Close',
      menu: ContextualMenu
  };

  public render(): JSX.Element {

    let closeModal = this._closeModal.bind(this);

    return (
      <>
        <Modal titleAriaId={this._titleId}
        subtitleAriaId={this._subtitleId}
        isOpen = {this.props.showModal}
        onDismiss = {this._closeModal}
        isBlocking = {false}
        containerClassName="ModalPopup"
        responsiveMode={ResponsiveMode.medium}
        dragOptions={this.state.isDraggable ? this._dragOptions : undefined}>
          <div id="ModalHeader">
            <h1 id={this._titleId} className="ModalHeaderText">BIN Search</h1>
          </div>
          <div>
            <div id="DetailsList">
            {this.props.children}
            </div>
            <div id="ModalFooter">
            <DefaultButton onClick={closeModal} text="Exit" className="modalCloseButton" />
            </div>
          </div>
        </Modal>
      </>
    )
  }

  private _showModal = (): void => {
    this.setState({ showModal: true });
  };

  private _closeModal = (): void => {
    this.setState({ showModal: false });
  };

  private _toggleDraggable = (): void => {
    this.setState({ isDraggable: !this.state.isDraggable });
  };
}