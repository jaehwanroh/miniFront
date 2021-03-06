import React, { Component, Profiler } from "react";
import styles from "../home/assert/home.module.scss";
import { IsJsonString, styleCombine } from "../../common/helper";
import MasterLayout from "../layout/MasterLayout";
import { DataGrid, Column, ColumnChooser, ColumnFixing, Editing, RequiredRule, PatternRule, EmailRule } from "devextreme-react/data-grid";
import { CustomRule } from 'devextreme-react/validator';
import TextBox from 'devextreme-react/text-box';
import "devextreme/data/odata/store";
import { LoadPanel } from 'devextreme-react/load-panel';
import "@grapecity/wijmo.styles/wijmo.css";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import { ListItemButton, ListItemText } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { map, isNaN } from "lodash";
import { Link } from 'react-router-dom'
import service from '../../jsonData/data';

const loadPanelPosition = {of:"#dataGrid"}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowMenu: false
      , menu1: false
      , menu2: false
      , isShowContentLeft: false
      , columnFixed: false
      , isMulti: false
      , isMask: false
      , isNew: false
      , isHide: false
      , isVal: false
    };
    this.gridFnc = React.createRef();
    this.employees = service.getEmployees();
    this.fixedColumn = this.fixedColumn.bind(this);
    this.multiColumn = this.multiColumn.bind(this);
    this.mask = this.mask.bind(this);
    this.runtimeColumn = this.runtimeColumn.bind(this);
    this.hideColumn = this.hideColumn.bind(this);
  }

  showMenu = () => {
    this.setState({ isShowMenu: !this.state.isShowMenu });
  };

  openMenu1 = () => {
    this.setState({ menu1: !this.state.menu1 });
  };

  openMenu2 = () => {
    this.setState({ menu2: !this.state.menu2 });
  };

  onCellPrepared = (e) => {
    if (e.rowType === 'header') {
      e.cellElement.style['textAlign'] = 'center'
    }
    if (e.rowType === 'data') {
      e.cellElement.style['verticalAlign'] = 'middle'
    }
  };

  onEditorPreparing = (e) => {  
    // if (e.dataField == 'HireDate' && this.state.isMask) {  
    //   e.editorName = 'dxDateBox';
    // }  
    // else if (e.dataField == 'BirthDate' && this.state.isMask) {  
    //   e.editorName = 'dxDateBox';
    // }
    // else if (e.dataField == 'Pay' && this.state.isMask) {  
    //   e.editorName = 'dxTextBox';
    //   e.editorOptions.mask = '#,##0.##'
    // }
    
  };

  onContentReady(){
    document.getElementsByClassName('dx-toolbar-items-container')[0].style.display = 'none'
  };

  calculateCellValue(data) {
    return [data.Title, data.FirstName, data.LastName].join(' ');
  };

  fixedColumn(){
    this.setState({ columnFixed: this.state.columnFixed === true ? false : true });
  };

  multiColumn(){
    this.setState({ isMulti: this.state.isMulti === true ? false : true });
  };

  mask(){
    this.setState({ isVal: this.state.isVal === true ? false : true });
    // alert('?????? ??? ????????? DevExtreme?????? ???????????? ????????????.');
  };

  validate(e) {
    return e.value !== "";
  }

  excel(){
    alert('?????? ??? ????????? DevExtreme?????? ???????????? ????????????.');
  };

  runtimeColumn(){
    if(this.state.isNew === false){
      const column = {
        dataField: "NewColumn"
        , alignment: "right" 
        , width: '230'
      }
      this.gridFnc.current.instance.addColumn(column);
      this.setState({ isNew: true});
    }
    else{
      this.gridFnc.current.instance.deleteColumn('NewColumn');
      this.setState({ isNew: false});
    }
  };

  hideColumn(){
    if(this.state.isNew === true && this.state.isHide === false){
      this.gridFnc.current.instance.columnOption('NewColumn', 'visible', false);
      this.setState({ isHide: true});
    }
    else if(this.state.isNew === true && this.state.isHide === true){
      this.gridFnc.current.instance.columnOption('NewColumn', 'visible', true);
      this.setState({ isHide: false});
    }
    else{
      alert('????????? ?????? ??????????????????.');
    }
  }

  fixedLabel(){
    alert('?????? ??? ????????? DevExtreme?????? ???????????? ????????????.');
  }

  render() {
    return (
      <MasterLayout>
        <div className={styles.main}>
          <div
            className={styleCombine(
              styles.main_left,
              this.state.isShowMenu ? styles.main_left_menu : styles.left_hide
            )}
          >
            <div className={styles.top_menu}>
              <img src="/images/logo.jpg" alt="" />
            </div>
            <div
              className={styleCombine(
                styles.bottom_menu,
                !this.state.isShowMenu ? styles.d_none : ""
              )}
            >
              <List className={styles.bottom_list}>
                <ListItemButton onClick={this.openMenu1}>
                  <ListItemText primary="??????????????? ?????????" />
                  {this.state.menu1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={this.state.menu1}
                  timeout="auto"
                  unmountOnExit
                  className={styles.list_item}
                >
                  <List component="div" disablePadding>
                    <Link to="/DevGrid" style={{ textDecoration: 'none', color: 'white' }}>
                      <ListItemButton>
                        <ListItemText
                          className={styles.description_bottom}
                          primary="?????????????????? ?????????"
                        />
                      </ListItemButton>
                    </Link>
                    <Link to="/DevTree" style={{ textDecoration: 'none', color: 'white' }}>
                      <ListItemButton>
                        <ListItemText
                          className={styles.description_bottom}
                          primary="??????????????? ?????????"
                        />
                      </ListItemButton>
                    </Link>
                    <Link to="/DevCalGrid" style={{ textDecoration: 'none', color: 'white' }}>
                      <ListItemButton>
                        <ListItemText
                          className={styles.description_bottom}
                          primary="?????????????????? ??????"
                        />
                      </ListItemButton>
                    </Link>
                    <Link to="/DevFnc" style={{ textDecoration: 'none', color: 'white' }}>
                      <ListItemButton>
                        <ListItemText
                          className={styles.description_bottom}
                          primary="?????????????????? ??????"
                        />
                      </ListItemButton>
                    </Link>
                  </List>
                </Collapse>
              </List>
            </div>
          </div>
          <div
            className={styleCombine(
              styles.main_right,
              this.state.isShowMenu ? styles.main_right_menu : styles.right_hide
            )}
          >
            <div onClick={this.showMenu} className={styles.top_content}>
              <div className={styles.stick_menu}>
                <img
                  src="/images/icon_menu_white.png"
                  height={30}
                  width={30}
                  alt=""
                />
              </div>
              <p className={styles.title_menu}>
                PI3??? ????????? / ????????? ????????? ?????????
              </p>
              <p className={styles.title_home}>Home</p>
            </div>
            <div className={styles.container_right}>
              <div className={styles.child_content_right}>
                <div
                  className={`${styles.content_right} ${
                    this.state.isShowContentLeft
                      ? styles.width60
                      : styles.width100
                  }`}
                >
                  <div className={styles.menu_right}>
                    <span>{this.state.title}</span>
                  </div>
                  <div className={styles.group_config_fnc}>
                    <div className={styles.config_top}>
                      <button
                        className={styles.btn_rendering}
                        onClick={this.multiColumn}
                      >
                        ???????????? ??? ??? ??????
                      </button>
                      <button
                        className={styles.btn_rendering}
                        onClick={this.fixedColumn}
                      >
                        ?????????
                      </button>
                      <button
                        onClick={this.mask}
                        className={styles.btn_rendering}
                      >
                        ???????????? ?????????
                      </button>
                      <button
                        onClick={this.excel}
                        className={styles.btn_rendering}
                      >
                        ?????? ??????/????????????
                      </button>
                      <button
                        className={styles.btn_rendering}
                        onClick={this.runtimeColumn}
                      >
                        ?????? ?????? ??????/??????
                      </button>
                      <button
                        className={styles.btn_rendering}
                        onClick={this.hideColumn}
                      >
                        ?????? ?????? ??????/??????
                      </button>
                      <button
                        className={styles.btn_rendering}
                        onClick={this.fixedLabel}
                      >
                        ?????? ????????? ??????
                      </button>
                    </div>
                  </div>
                  <div className={styles.fncgridbox}>
                  <DataGrid
                    id="gridFnc"
                    ref={this.gridFnc}
                    dataSource={this.employees}
                    // keyExpr="ID"
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                    columnAutoWidth={true}
                    showBorders={true}
                    onContentReady = {this.onContentReady}
                    // onEditorPreparing={this.onEditorPreparing}
                  >
                    <Editing
                      mode="batch"
                      allowUpdating={true}
                    />
                    <ColumnFixing enabled={true} />
                    <Column caption="Employee" width={230} fixed={this.state.columnFixed} calculateCellValue={this.calculateCellValue} />
                      {this.state.isMulti === true ? (
                        <Column caption="??????">
                          <Column dataField="BirthDate" caption="????????????" dataType="date" width={230}/>
                          <Column dataField="HireDate" caption="?????????" dataType="date" width={230}/>
                        </Column>
                      ) : (
                        <Column dataField="BirthDate1" caption="????????????" dataType="date" width={230}/>
                      )}
                    <Column dataField="HireDate1" caption="?????????" dataType="date" width={230} visible={!this.state.isMulti} format= "shortDate"/>
                    <Column dataField="Pay" alignment="right" format="#,##0.##" width={230}  />
                    <Column dataField="Position" alignment="right" width={230} />
                    <Column dataField="Address" width={230} >
                      {this.state.isVal === true ? (
                        <CustomRule 
                        validationCallback={this.validate}
                        message="????????? ??????????????????."/>
                      ) : ("")}
                    </Column>
                    <Column dataField="City" width={230} >
                      {this.state.isVal === true ? (
                        <CustomRule 
                        validationCallback={this.validate}
                        message="????????? ??????????????????."/>
                      ) : ("")}
                    </Column>
                    <Column dataField="State"width={230} >
                      {this.state.isVal === true ? (
                        <CustomRule 
                        validationCallback={this.validate}
                        message="?????? ??????????????????."/>
                      ) : ("")}
                    </Column>
                    <Column dataField="HomePhone" dataType='string'>
                      {/* {this.state.isVal === true ? (<RequiredRule />) : ("")} */}
                      {this.state.isVal === true ? (
                        <CustomRule 
                        validationCallback={this.validate}
                        message="?????????????????? ??????????????????."/>
                      ) : ("")}
                      {this.state.isVal === true ? (
                        <PatternRule
                        message={'????????? ?????? ????????? ?????? ??????????????????. ex) 010-1234-1234'}
                        pattern={/^\\d{3}\ \d{4}-\d{4}$/i}
                        />
                      ) : ("")}
                    </Column>
                    <Column dataField="MobilePhone" dataType='string'>
                      {this.state.isVal === true ? (
                        <CustomRule 
                        validationCallback={this.validate}
                        message="????????????????????? ??????????????????."/>
                      ) : ("")}
                      {this.state.isVal === true ? (
                        <PatternRule
                        message={'????????? ?????? ????????? ?????? ??????????????????. ex) 010-1234-1234'}
                        pattern={/^\\d{3}\ \d{4}-\d{4}$/i}
                        />
                      ) : ("")}
                    </Column>
                    <Column dataField="Skype" >
                      {this.state.isVal === true ? (
                        <CustomRule 
                        validationCallback={this.validate}
                        message="Skype???????????? ??????????????????."/>
                      ) : ("")}
                    </Column>
                    <Column dataField="Email" >
                      {this.state.isVal === true ? (
                        <CustomRule 
                        validationCallback={this.validate}
                        message="???????????? ??????????????????."/>
                      ) : ("")}
                      {this.state.isVal === true ? (<EmailRule />) : ("")}
                    </Column>
                  </DataGrid>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MasterLayout>
    );
  }
}

export default Home;
