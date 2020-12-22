import * as React from 'react';
import { IExampleItem } from 'office-ui-fabric-react/lib/utilities/exampleData';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';


import {
    DefaultButton,
    TextField,
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    IColumn,
    MarqueeSelection,
    Fabric,
    mergeStyles,
  } from 'office-ui-fabric-react/lib';

 import { DialogBlockingExample } from './BlockingDialogFabric';
  
  const exampleChildClass = mergeStyles({
    display: 'block',
    marginBottom: '10px'
  });
  
  let subTextString: any;

interface IDetailsListBasicExampleItem {
    BIN_id: string;
    BIN: number;
    Issuer: string;
    Region: string;
  }
export interface IDetailsListBasicExampleState {
    sortedItems: IDetailsListBasicExampleItem[];
    columns: IColumn[];
    selectionDetails: {};
  }
export class DetailsListBasicExample extends React.Component<any, IDetailsListBasicExampleState> 
{

  private _selection: Selection;
  private _allItems: IDetailsListBasicExampleItem[] = [];
  private _columns: IColumn[];

  constructor(props: any) {
    super(props);
    debugger;
    alert("test123");

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    for (let i = 0; i < props.items.length; i++) {
      debugger;
      this._allItems.push(
        props.items[i]
      );
    }

    debugger;
    this._columns = require("./SearchColumnMapping.JSON");
    alert(this._columns);
    this.state = {
      sortedItems: this._allItems,
      selectionDetails: this._getSelectionDetails(),
      columns: this._columns
      
    };
  }

  public render() : JSX.Element {
    const { sortedItems, selectionDetails, columns } = this.state;

    return (
      <Fabric>
        <div className={exampleChildClass}>{selectionDetails}</div>
        <TextField
          className={exampleChildClass}
          label="Filter by BIN Number:"
          onChange={this._onFilter}
          styles={{ root: { maxWidth: '300px' } }}
        />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={sortedItems}
            columns={columns}
            onRenderItemColumn={_renderItemColumn}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
            onItemInvoked={this._onItemInvoked.bind(this)}
            selectionMode = {SelectionMode.single}
            onColumnHeaderClick = {this._onColumnClick}
            compact = {true}
            enterModalSelectionOnTouch = {true}
          />
        </MarqueeSelection>
        <DefaultButton
          onClick={
            () => {
              let returnvalue : any = {};

              returnvalue.binid = (this._selection.getSelection()[0] as IDetailsListBasicExampleItem ).BIN_id;
              returnvalue.binname = (this._selection.getSelection()[0] as IDetailsListBasicExampleItem ).BIN;

              let hiddenBinField = document.getElementById("hidden_selectedBin") as any;
              
              hiddenBinField.value = JSON.stringify(returnvalue);
              hiddenBinField.dispatchEvent(new Event("change"));
              this.props.closeModalEvent();
            }
          }
        >
           Select
        </DefaultButton>
      </Fabric>
    );
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return (
          '1 item selected: ' +
          (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).BIN
        );
      default:
        return `${selectionCount} items selected`;
    }
  };

  private _onFilter = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string | undefined
  ): void => {
    this.setState({
      sortedItems: text
        ? this._allItems.filter(i => i.BIN.toString().toLowerCase().indexOf(text) > -1)
        : this._allItems
    });
  };

  private _onColumnClick = (event: React.MouseEvent<HTMLElement> | undefined, column: IColumn | any): void => {
    const { columns } = this.state;
    let { sortedItems } = this.state;
    let isSortedDescending = column.isSortedDescending;
    debugger;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    sortedItems = _copyAndSort(sortedItems, column.fieldName!, isSortedDescending);

    // Reset the items and columns to match the state.
    this.setState({
      sortedItems: sortedItems,
      columns: columns.map(col => {
        col.isSorted = col.key === column.key;

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      })
    });
  };

  // private _onColumnHeaderContextMenu(column: IColumn | undefined, ev: React.MouseEvent<HTMLElement> | undefined): void {
  //   console.log(`column ${column!.key} contextmenu opened.`);
  // }

  private _onItemInvoked(item: any, index: number | undefined): void {
    //alert(`Item ${item.name} at index ${index} has been invoked.`);

    let returnvalue : any = {};

    returnvalue.binid = item.BIN_id;
    returnvalue.binname = item.BIN;

    let hiddenBinField = document.getElementById("hidden_selectedBin") as any;
              
    hiddenBinField.value = JSON.stringify(returnvalue);
    hiddenBinField.dispatchEvent(new Event("change"));
    this.props.closeModalEvent();
  }
}

function _renderItemColumn(item: IExampleItem | any, index: number | undefined, column: IColumn | any)
{
  const fieldContent = item[column.fieldName as keyof IExampleItem] as string;

  switch (column.key) {
    case 'thumbnail':
      return <Image src={fieldContent} width={50} height={50} imageFit={ImageFit.cover} />;

    case 'name':
      return <Link href="#">{fieldContent}</Link>;

    case 'color':
      return (
        <span data-selection-disabled={true} className={mergeStyles({ color: fieldContent, height: '100%', display: 'block' })}>
          {fieldContent}
        </span>
      );

    case 'alias':
      debugger;

      subTextString = item["BID"] + "\n" + item["Co-Issuer"] +"\n";

      let props = {
        hideDialog: true,
        buttonText: "Alias Name",
        title: "Alias Name Details",
        subText: subTextString
      }
  
      return (
        //<DefaultButton onClick={_showAliasName} className="AliasName" color="blue" text="Alias Name"></DefaultButton>
         React.createElement(DialogBlockingExample,props)
      )

    default:
      return <span>{fieldContent}</span>;
  }
}

function _showAliasName (): void {
    
  //debugger;
  
  alert(subTextString);
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}