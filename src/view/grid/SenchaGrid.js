import React, { Component, Profiler } from "react";
import styles from "../home/assert/home.module.scss";
import { IsJsonString, styleCombine } from "../../common/helper";
import MasterLayout from "../layout/MasterLayout";
import { DataGrid, Column, Sorting, Selection } from "devextreme-react/data-grid";
import "devextreme/data/odata/store";
import { LoadPanel } from 'devextreme-react/load-panel';
// import { ExtGrid } from "@sencha/ext-react-modern";
// import { ExtColumn } from "@sencha/ext-react-modern";
import "@grapecity/wijmo.styles/wijmo.css";
import { FlexGrid, FlexGridColumn } from "@grapecity/wijmo.react.grid";
import { FlexGridFilter } from "@grapecity/wijmo.react.grid.filter";
// import { CSVLink } from "react-csv";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import { ListItemButton, ListItemText } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import axios from "axios";
import moment from "moment";
import { map, isNaN } from "lodash";
import { Link } from 'react-router-dom'

const Ext = window["Ext"];
const loadPanelPosition = {of:"#dataGrid"}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerData: []
      , dataSource:'{"systemCode":"DSP","title":"","serviceURL":"http://dspdevpi.poscoenc.com/Services/DSP/WebServices/AF_Payment.asmx","method":"GetPaymentHistoryList","parameter":",,,\\"2020-01-01\\",\\"2021-10-30\\",,,,,,,\\"1\\"","userId":"S10332","tableIndex":0,"dataUrl":"http://poc.poscoenc.com:8084/DSP_0b1b649b-7cb0-e283-7c81-aba0e8f881c6.json","sortBy":[{"RowNo":"asc"}],"scroll":[{"position":10},{"position":20}],"filterBy":[{"column":"RowNo","expr":"<100"}],"columns":[{"colname":"RowNo","caption":"순번","datatype":"number","readonly":false,"format":"","halign":"","visible":true,"dataField":"RowNo","alignment":"center"},{"colname":"PjtCode","caption":"프로젝트코드","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"PjtCode","alignment":"center"},{"colname":"CtrtNo","caption":"계약번호","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"CtrtNo","alignment":"center"},{"colname":"PfmContTypeCode","caption":"프로젝트명","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"PfmContTypeCode","alignment":"center"},{"colname":"OrdrNo","caption":"","datatype":"number","readonly":false,"format":"","halign":"","visible":true,"dataField":"OrdrNo"},{"colname":"PaymtSeqNo","caption":"","datatype":"number","readonly":false,"format":"","halign":"","visible":true,"dataField":"PaymtSeqNo"},{"colname":"ChgSeq","caption":"차수","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"ChgSeq"},{"colname":"VrfDate","caption":"","datatype":"date","readonly":false,"format":"","halign":"","visible":true,"dataField":"VrfDate","alignment":"center"},{"colname":"CtrtName","caption":"계약건명","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"CtrtName"},{"colname":"VndrCode","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"VndrCode","alignment":"center"},{"colname":"VndrName","caption":"계약업체","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"VndrName"},{"colname":"PaymtCurCode","caption":"통화","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"PaymtCurCode","alignment":"center"},{"colname":"VrfAmt","caption":"검수금액","datatype":"number","readonly":false,"format":"","halign":"","visible":true,"dataField":"VrfAmt"},{"colname":"PaymtSchdDate","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"PaymtSchdDate","alignment":"center"},{"colname":"SetlDate","caption":"품의일자","datatype":"date","readonly":false,"format":"","halign":"","visible":true,"dataField":"SetlDate","alignment":"center"},{"colname":"InvoiceAprvDate","caption":"전표승인일","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"InvoiceAprvDate","alignment":"center"},{"colname":"TaxBillIssueDate","caption":"계산서발행일","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"TaxBillIssueDate","alignment":"center"},{"colname":"PaymtDate","caption":"실지급일","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"PaymtDate","alignment":"center"},{"colname":"RealPaymtAmt","caption":"실지급액","datatype":"number","readonly":false,"format":"","halign":"","visible":true,"dataField":"RealPaymtAmt"},{"colname":"InvoiceNo","caption":"전표번호","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"InvoiceNo","alignment":"center"},{"colname":"ProgStusCode","caption":"진행상태","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"ProgStusCode","alignment":"center"},{"colname":"ProgStusName","caption":"진행상태","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"ProgStusName","alignment":"center"},{"colname":"InvoiceProgStusCode","caption":"ERP상태","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"InvoiceProgStusCode","alignment":"center"},{"colname":"PjtName","caption":"프로젝트명","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"PjtName"},{"colname":"PaymtTypeCode","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"PaymtTypeCode","alignment":"center"},{"colname":"PaymtTypeName","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"PaymtTypeName","alignment":"center"},{"colname":"PaymtGubun","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"PaymtGubun","alignment":"center"},{"colname":"CtrtSeqNo","caption":"","datatype":"number","readonly":false,"format":"","halign":"","visible":true,"dataField":"CtrtSeqNo"},{"colname":"CtrtCurCode","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"CtrtCurCode","alignment":"center"},{"colname":"FIssueYN","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"FIssueYN","alignment":"center"},{"colname":"TaxBillDocuNo","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"TaxBillDocuNo"},{"colname":"Dti_No","caption":"","datatype":"number","readonly":false,"format":"","halign":"","visible":true,"dataField":"Dti_No"},{"colname":"JobFuncDvsCode","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"JobFuncDvsCode","alignment":"center"},{"colname":"CoSclCodeName","caption":"업체구분","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"CoSclCodeName"},{"colname":"LegalPaymtDeadlineDate","caption":"지급기한","datatype":"date","readonly":false,"format":"","halign":"","visible":true,"dataField":"LegalPaymtDeadlineDate","alignment":"center"},{"colname":"DueDate","caption":"법정지급기한","datatype":"date","readonly":false,"format":"","halign":"","visible":true,"dataField":"DueDate","alignment":"center"},{"colname":"DiffDueDate","caption":"경과일수","datatype":"number","readonly":false,"format":"","halign":"","visible":true,"dataField":"DiffDueDate"},{"colname":"ComPaymtDateYn","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"ComPaymtDateYn","alignment":"center"},{"colname":"CtrtChgrEmplIDName","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"CtrtChgrEmplIDName","alignment":"center"},{"colname":"PaymtChgrEmplIDName","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"PaymtChgrEmplIDName","alignment":"center"},{"colname":"VerifierEmplIDName","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"VerifierEmplIDName","alignment":"center"},{"colname":"CtrtMigTypeCode","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"CtrtMigTypeCode","alignment":"center"},{"colname":"PrePaymtSetlStus","caption":"대금조기집행품의서","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"PrePaymtSetlStus","alignment":"center"},{"colname":"PrePaymtSetlFileAppdPssblYN","caption":"","datatype":"string","readonly":false,"format":"","halign":"","visible":true,"dataField":"PrePaymtSetlFileAppdPssblYN","alignment":"center"}]}'   
      , dataLoading: null
      , columns: []
      , isShowMenu: false
      , logTimeData: []
      , menu1: false
      , menu2: false
      , isClearLog: false
      , isRenderExt: false
      , isRenderSencha: false
      , isRenderWismo: false
      , type: "binding"
      , sequenceExt: 0
      , sequenceSencha: 0
      , sequenceWismo: 0
      , sequenceLoading: 0
      , dataSort: []
      , filterType: "include"
      , filterValues: []
      , filterData: []
      , filterOperations: ["contains", "=", "<", ">", ">=", "<="]
      , isShowContentLeft: true
      , dataType: []
      , sequenceTestValue: null
      , alignment: []
      , focusedRowKey: 1
      , loadPanelVisible: false
      , showIndicator: true
      , shading: true
      , showPane: true
      , isDev: true
      , isSencha: false
      , isWijmo: false
    };
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
    this.onFocusedRowChanged = this.onFocusedRowChanged.bind(this);
  }

  onChangeInputData = (event) => {
    let data = event.target.value;
    this.setState({ dataSource: data, customerData: [], columns: [] });
  };

  showContentLeft = () => {
    this.setState({ isShowContentLeft: !this.state.isShowContentLeft });
  };

  convertDataSource = () => {
    this.clearLog();
    this.setState({ customerData: [] });
    this.setState({ columns: [] });
    this.setState({ isClearLog: false });
    this.setState({
      isRenderExt: true
      // isRenderSencha: true,
      , isRenderWismo: true
    });

    let parseData = IsJsonString(this.state.dataSource)
      ? JSON.parse(this.state.dataSource)
      : [];
    console.log(JSON.stringify(parseData))
    this.convertData(parseData);


  };

  bindingData = () => {
    this.setState({ customerData: [] });
    this.setState({ columns: [] });
    this.setState({
      isRenderExt: true
      // isRenderSencha: true,
      , isRenderWismo: true
      , type: "binding"
    });
    this.convertData(this.state.dataLoading);
  };

  convertData = (
    parseData,
    type = "binding",
    dataSort = [],
    filterData = []
  ) => {
    let dataType = this.getDataType(parseData);
    this.setState({ customerData: parseData });
    if (Array.isArray(parseData)) {
      if (!parseData.length) {
        this.setState({ columns: [] });
        return;
      }

      this.convertFormartArray(parseData, type, dataSort, filterData, dataType);
      return;
    }

    this.convertFormartObject(parseData, type, dataSort, filterData, dataType);
  };

  convertDataFromUrl = async () => {
    if (!this.state.dataSource) {
      return;
    }

    this.setState({ type: "binding" });

    try {
      let parseData = IsJsonString(this.state.dataSource)
        ? JSON.parse(this.state.dataSource)
        : [];
      const startTime = new Date().valueOf();

      await axios.get(parseData.dataUrl).then((res) => {
        const endTime = new Date().valueOf();
        const sequenceLoading = this.state.sequenceLoading + 1;
        const loadDatalog = {
          trialNo: this.formatTrialNo(),
          catId: "front-end",
          itemId: "data loading",
          solId: "devext-grid",
          startTime: this.formatDateFromMilliseconds(startTime),
          endTime: this.formatDateFromMilliseconds(endTime),
          labelTime: (endTime - startTime).toFixed(1),
          seq: sequenceLoading,
          createTime: this.formatCreateTime(),
          note : "dev"
        };
        let logTime = this.state.logTimeData;
        logTime.push(loadDatalog);
        this.setState({ dataLoading: res.data, logTimeData: logTime });
        this.setState({ sequenceLoading: sequenceLoading });
      });
    } catch (e) {
      this.setState({ dataLoading: [] });
    }
  };

  convertFormartObject = (
    parseData,
    type = "binding",
    dataSort = [],
    filterData = [],
    dataType = []
  ) => {
    const colums = parseData.columns;
    const keys = colums.map((item) => item.colname);
    let obj = {};
    colums.forEach((item) => {
      obj[item.colname] = item.caption;
    });
    const data = [obj];

    this.setState({ columns: keys });
    this.setState({ customerData: data });

    // let senchaModel = keys.map((item) => {
    //   const model = {
    //     name: item,
    //     type: dataType[item],
    //   };
    //   return model;
    // });
    // let senchaModelNameRandom =
    //   "SenchaModel" + (Math.random() + 1).toString(36).substring(7);

    // Ext.define(senchaModelNameRandom, {
    //   extend: "Ext.data.Model",
    //   fields: senchaModel,
    // });

    let sort = [];

    if (this.state.type === "sort") {
      keys.forEach((item) => {
        let _direction = this.checkSort(item, dataSort);

        if (_direction) {
          sort.push({
            property: item,
            direction: _direction.toUpperCase(),
          });
        }
      });
    }

    // this.store = Ext.create("Ext.data.Store", {
    //   model: senchaModelNameRandom,
    //   data: data,
    //   sorters: sort,
    //   filters: [],
    // });

    // if (type === "filter") {
    //   let _filters = this.store.getFilters();

    //   filterData.forEach((itemFilter) => {
    //     _filters.add((item) => this.getFilters(item, itemFilter));
    //   });
    // }
  };

  convertFormartArray = (
    parseData,
    type = "binding",
    dataSort = [],
    filterData = [],
    dataType = []
  ) => {
    let keys = Object.keys(parseData[0]);
    this.setState({ columns: keys });
    // let senchaModel = keys.map((item) => {
    //   const model = {
    //     name: item,
    //     type: dataType[item],
    //   };
    //   return model;
    // });
    // let senchaModelNameRandom =
    //   "SenchaModel" + (Math.random() + 1).toString(36).substring(7);

    // Ext.define(senchaModelNameRandom, {
    //   extend: "Ext.data.Model",
    //   fields: senchaModel,
    // });
    let sort = [];

    if (type === "sort") {
      keys.forEach((item) => {
        let _direction = this.checkSort(item, dataSort);

        if (_direction) {
          sort.push({
            property: item,
            direction: _direction.toUpperCase(),
          });
        }
      });
    }

    // this.store = Ext.create("Ext.data.Store", {
    //   data: parseData,
    //   sorters: sort,
    //   filters: [],
    // });

    // if (type === "filter") {
    //   let _filters = this.store.getFilters();

    //   filterData.forEach((itemFilter) => {
    //     _filters.add((item) => this.getFilters(item, itemFilter));
    //   });
    // }
  };

  getFilters = (item, itemFilter) => {
    let value = itemFilter.value;
    let expr = itemFilter.expr;
    let column = itemFilter.column.replaceAll(" ", "");

    switch (expr) {
      case ">":
        return Number(item.data[column]) > Number(value);
      case "<":
        return Number(item.data[column]) < Number(value);
      case ">=":
        return Number(item.data[column]) >= Number(value);
      case "<=":
        return Number(item.data[column]) <= Number(value);
      case "=":
        return Number(item.data[column]) === Number(value);
      case "contains":
        return item.data[column].includes(value);
      default:
        return item.data[column].includes(value);
    }
  };

  onLogTimeData = async () => {
    const startTime = new Date();
    const endTime = new Date();
    let data = {
      trialNo: "20211125100900",
      catId: "front-end",
      itemId: "binding",
      solId: "devext-grid",
      startTime: startTime,
      endTime: endTime,
      note: "",
    };

    // const res = await axios.post("http://poc.poscoenc.com:8081/ServerTest/SaveResultData", {})
  };

  callbackDevExtreme = (
    id,
    phase,
    actualTime,
    baseTime,
    startTime,
    commitTime
  ) => {
    let endTime = new Date().valueOf();
    let _startTime = endTime - actualTime;
    
    if (phase !== "mount" && !this.state.isRenderExt) {
      return;
    }
    const sequenceExt = this.state.sequenceExt + 1;
    let data = {
      trialNo: this.formatTrialNo(),
      catId: "front-end",
      itemId: this.state.type,
      solId: "devext-grid",
      startTime: this.formatDateFromMilliseconds(_startTime),
      endTime: this.formatDateFromMilliseconds(endTime),
      labelTime: actualTime.toFixed(1),
      seq: sequenceExt,
      note: "",
      createTime: this.formatCreateTime(),
    };
    
    let logTime = this.state.logTimeData;
    logTime.push(data);
    this.setState({ logTimeData: logTime });
    this.setState({ isRenderExt: false, sequenceExt: sequenceExt });
    
  };

  formatTrialNo() {
    return moment().zone("+0900").format("YYYYMMDDHHmmss");
  }

  formatDateFromMilliseconds(milliseconds) {
    //return moment(milliseconds).zone("+0900").format("YYYY-MM-DD HH:mm:ss.ms");
    return moment(milliseconds).zone("+0900").format("YYYY-MM-DD HH:mm:ss.SSS");

  }

  formatCreateTime() {
    return moment().zone("+0900").format("YYYY-MM-DD HH:mm:ss.ms");
  }

  callbackSencha = (id, phase, actualTime, baseTime, startTime, commitTime) => {
    let endTime = new Date().valueOf();
    let _startTime = endTime - actualTime;

    if (phase !== "mount" && !this.state.isRenderSencha) {
      return;
    }

    const sequenceSencha = this.state.sequenceSencha + 1;
    let data = {
      trialNo: this.formatTrialNo(),
      catId: "front-end",
      itemId: this.state.type,
      solId: "sencha-grid",
      startTime: this.formatDateFromMilliseconds(_startTime),
      endTime: this.formatDateFromMilliseconds(endTime),
      labelTime: actualTime.toFixed(1),
      sequence: sequenceSencha,
      note: "",
      createTime: this.formatCreateTime(),
    };

    let logTime = this.state.logTimeData;
    logTime.push(data);
    this.setState({ logTimeData: logTime });
    this.setState({ isRenderSencha: false, sequenceSencha: sequenceSencha });
  };

  callbackWismo = (id, phase, actualTime, baseTime, startTime, commitTime) => {
    let endTime = new Date().valueOf();
    let _startTime = endTime - actualTime;

    if (phase !== "mount" && !this.state.isRenderWismo) {
      return;
    }
    const sequenceWismo = this.state.sequenceWismo + 1;
    let data = {
      trialNo: this.formatTrialNo(),
      catId: "front-end",
      itemId: this.state.type,
      solId: "wismo-grid",
      startTime: this.formatDateFromMilliseconds(_startTime),
      endTime: this.formatDateFromMilliseconds(endTime),
      labelTime: actualTime.toFixed(1),
      sequence: sequenceWismo,
      note: "",
      createTime: this.formatCreateTime(),
    };

    let logTime = this.state.logTimeData;
    logTime.push(data);
    this.setState({ logTimeData: logTime });
    this.setState({ isRenderWismo: false, sequenceWismo: sequenceWismo });
  };

  showMenu = () => {
    this.setState({ isShowMenu: !this.state.isShowMenu });
  };

  openMenu1 = () => {
    this.setState({ menu1: !this.state.menu1 });
  };

  openMenu2 = () => {
    this.setState({ menu2: !this.state.menu2 });
  };

  clearLog = () => {
    this.setState({ isClearLog: true });
    this.setState({
      logTimeData: [],
      sequenceExt: 0,
      sequenceSencha: 0,
      sequenceWismo: 0,
      sequenceLoading: 0,
    });
  };

  getDataExport = () => {
    let data = this.state.logTimeData;
    let rowData = data.map((item) => Object.values(item));

    return rowData;
  };

  resetData = () => {
    this.setState({
      customerData: [],
      dataSource: "",
      dataLoading: null,
      columns: [],
      isShowMenu: false,
      logTimeData: [],
      menu1: false,
      menu2: false,
      isClearLog: false,
      isRenderExt: false,
      isRenderSencha: false,
      isRenderWismo: false,
      type: "binding",
      sequenceExt: 0,
      sequenceSencha: 0,
      sequenceWismo: 0,
      sequenceLoading: 0,
    });
  };

  sortData = () => {
    this.setState({ customerData: [] });
    this.setState({ isRenderExt: true });
    this.setState({ isRenderSencha: true });
    this.setState({ isRenderWismo: true });
    this.setState({ type: "sort" });
    
    let _dataSort = JSON.parse(this.state.dataSource);
    _dataSort = _dataSort.sortBy;
    this.setState({ dataSort: _dataSort });
    this.convertData(this.state.dataLoading, "sort", _dataSort);
  };

  checkSort(columName, dataSort = []) {
    if (!this.state.dataSort) {
      return "";
    }
    let _dataSort = dataSort.length ? dataSort : this.state.dataSort;
    let columSort = _dataSort.find((item) => {
      let key = Object.keys(item)[0];
      key = key.replaceAll(" ", "");

      if (key.toLowerCase() === columName.toLowerCase()) {
        return item[columName];
      }
    });

    if (!columSort) {
      return "";
    }

    return Object.values(columSort)[0];
  }

  scrollData = () => {
    // this.setState({ customerData: [] });
    let data = JSON.parse(this.state.dataSource);
    let position = data.scroll;
    // let pos1 = Object.values(position[0])[0];
    // let pos2 = Object.values(position[1])[0];
    // data = this.state.dataLoading.slice(pos1, pos2);
    // this.convertData(data);
    
    position.forEach((item, i) => {
      setTimeout(() => {
        this.setState({ focusedRowKey: item.position });
      }, i * 1000);
    });
    
    const startTime = new Date().valueOf();
    const endTime = new Date().valueOf();
    const sequenceLoading = this.state.sequenceLoading + 1;
    const loadDatalog = {
      trialNo: this.formatTrialNo(),
      catId: "front-end",
      itemId: "scrolling",
      solId: "devext-grid",
      startTime: this.formatDateFromMilliseconds(startTime),
      endTime: this.formatDateFromMilliseconds(endTime),
      labelTime: (endTime - startTime).toFixed(1),
      seq: sequenceLoading,
      createTime: this.formatCreateTime(),
      note: 'dev'
    };
    let logTime = this.state.logTimeData;
    logTime.push(loadDatalog);
    this.setState({ logTimeData: logTime });
    this.setState({ sequenceLoading: sequenceLoading });
  };

  applyFilter = () => {
    this.setState({ customerData: [] });
    this.setState({ isRenderExt: true });
    this.setState({ isRenderSencha: true });
    this.setState({ isRenderWismo: true });
    this.setState({ type: "filter" });
    
    let filterData = JSON.parse(this.state.dataSource);
    filterData = filterData.filterBy;
    filterData = filterData.map((item) => {
      let expr = item.expr.slice(0, 2);
      let value = item.expr.slice(2, item.expr.length);
      
      if (!this.state.filterOperations.includes(expr)) {
        expr = item.expr.slice(0, 1);
        value = item.expr.slice(1, item.expr.length);
      }
      
      if (!this.state.filterOperations.includes(expr)) {
        expr = "contains";
      }
      
      return {
        column: item.column,
        expr: expr,
        value: value,
      };
    });
    
    this.setState({ filterData: filterData });
    this.convertData(this.state.dataLoading, "filter", [], filterData);
  };

  getSelectedOperation = (columnName) => {
    if (this.state.filterData.length === 0) {
      return;
    }

    let operation = this.state.filterData.find((item) => {
      let colname = item.column.replaceAll(" ", "");
      return colname.toLowerCase() === columnName.toLowerCase();
    });
    if (operation) {
      return operation.expr;
    }
  };

  getFilterValues = (columnName) => {
    if (this.state.type !== "filter") {
      return;
    }

    let value = this.state.filterData.find((item) => {
      let colname = item.column.replaceAll(" ", "");
      return colname.toLowerCase() === columnName.toLowerCase();
    });

    if (value) {
      if (["<", ">", "=", "<=", ">="].includes(value.expr)) {
        return Number(value.value);
      }

      return value.value;
    }
  };

  getDataType(parseData) {
    let data = parseData[0];
    let _dataType = {};
    let obj = {};
    
    if(parseData.dataUrl !== undefined){
      parseData["columns"].forEach((item) => {
        obj[item.colname] = item.alignment;
      });
      const data = [obj];
      this.setState({ alignment: data });
    }

    map(data, (item, key) => {
      let type = isNaN(Number(item)) ? "string" : "number";
      _dataType[key] = type;
    });

    this.setState({ dataType: _dataType });
    
    return _dataType;
  }

  callApi = () => {
    const url = "http://poc.poscoenc.com:8081/ServerTest/SaveResultData";
    
    Promise.all(
      this.state.logTimeData.map(async (item) => {
        await axios.post(url, item);
      })
      );
  };

  onChangeSequenceTestValue = (e) => {
    this.setState({ sequenceTestValue: e.target.value });
  };

  handleSequenceTest = async () => {
    for (let i = 0; i < this.state.sequenceTestValue; i++) {
      this.setState({ loadPanelVisible: true });
      await this.bindingData();
      this.sortData();
      this.applyFilter();
      this.scrollData();
    }
    this.setState({ loadPanelVisible: false });
  };

  callApiAndClearLog = async (e) => {
    if (e.target.checked) {
      await this.callApi();
      this.clearLog();
    }
  };

  onCellPrepared = (e) => {
    if (e.rowType === 'header') {
      e.cellElement.style['textAlign'] = 'center'
    }
    if (e.rowType === 'data') {
      e.cellElement.style['verticalAlign'] = 'middle'
    }
  };

  onSelectionChanged({ selectedRowsData }) {
    const data = selectedRowsData[0];

    this.setState({ focusedRowKey: data.RowNo });
  };

  onFocusedRowChanged(e) {
    const dataRow = e.row && e.row.data;
    const progress = dataRow && dataRow.Task_Completion ? `${dataRow.Task_Completion}%` : '';
    this.setState({
      focusedRowKey: e.component.option('focusedRowKey'),
    });
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
                  <ListItemText primary="프론트엔드 테스트" />
                  {this.state.menu1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={this.state.menu1}
                  timeout="auto"
                  unmountOnExit
                  className={styles.list_item}
                >
                  <List component="div" disablePadding>
                    <ListItemButton>
                      <ListItemText
                        className={styles.description_bottom}
                        primary="데이타그리드 렌더링"
                      />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText
                        className={styles.description_bottom}
                        primary="트리그리드 렌더링"
                      />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText
                        className={styles.description_bottom}
                        primary="데이타그리드 계산"
                      />
                    </ListItemButton>
                    <ListItemButton>
                      <ListItemText
                        className={styles.description_bottom}
                        primary="데이터그리드 기능"
                      />
                    </ListItemButton>
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
                PI3기 플랫폼 / 그리드 솔루션 테스트
              </p>
              <p className={styles.title_home}>Home</p>
            </div>
            <div className={styles.container_right}>
              <div className={styles.child_content_right}>
                {this.state.isShowContentLeft && (
                  <div className={styles.content_left}>
                    <div className={styles.content_left_title}>
                      <div className={styles.line_tittle} />
                      <span>시나리오 셋업</span>
                      <button onClick={this.convertDataSource}>적용</button>
                    </div>
                    <textarea
                      onChange={this.onChangeInputData}
                      className={styles.data_input}
                      cols={50}
                      rows={20}
                      value={this.state.dataSource}
                    />
                    <div className={styles.log_time}>
                      <div className={styles.line_log_tittle} />
                      <span>테스트 결과 로그뷰</span>
                      <button onClick={this.clearLog}>지우기</button>
                    </div>
                    <div className={styles.data_output}>
                      {this.state.logTimeData.map((item, index) => {
                        return (
                          <div key={index}>
                            <p>{JSON.stringify(item)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div
                  className={`${styles.content_right} ${
                    this.state.isShowContentLeft
                      ? styles.width60
                      : styles.width100
                  }`}
                >
                  <div className={styles.menu_right}>
                    <button onClick={this.showContentLeft}>
                      <img
                        src="/images/icon_menu_black.png"
                        width={30}
                        height={30}
                        alt=""
                      />
                    </button>
                    <span>데이타 그리드 테스트 (외주계약목록조회)</span>
                  </div>
                  <div className={styles.group_config}>
                    <div className={styles.config_top}>
                      <button
                        className={styles.btn_loading}
                        onClick={this.convertDataFromUrl}
                      >
                        데이타로딩
                      </button>
                      <button
                        className={styles.btn_rendering}
                        onClick={this.bindingData}
                      >
                        최초렌더링
                      </button>
                      <button
                        onClick={this.sortData}
                        className={styles.btn_sort}
                      >
                        정렬
                      </button>
                      <button
                        onClick={this.applyFilter}
                        className={styles.btn_filter}
                      >
                        필터링
                      </button>
                      <button
                        className={styles.btn_scroll}
                        onClick={this.scrollData}
                      >
                        스크롤
                      </button>
                      {this.state.logTimeData.length ? (
                        <button
                          className={styles.btn_measurement}
                          onClick={this.callApi}
                        >
                          측정결과저장
                        </button>
                      ) : (
                        <button className={styles.btn_measurement}>
                          측정결과저장
                        </button>
                      )}
                      <Link to="/DevGrid"> 
                      <input
                        type="checkbox"
                        name="checkComponet"
                        defaultChecked={false}
                      />
                      </Link>
                      <label htmlFor="checkDev"> DevExtreme</label>
                      <Link to="/SenchaGrid"> 
                      <input
                        type="checkbox"
                        name="checkComponet"
                        defaultChecked={true}
                      />
                      </Link>
                      <label htmlFor="checkSencha"> Sencha</label>
                      <Link to="/WijmoGrid"> 
                      <input
                        type="checkbox"
                        name="checkComponet"
                        defaultChecked={false}
                      />
                      </Link>
                      <label htmlFor="chekWijmo"> Wijmo</label>
                    </div>
                    <div className={styles.config_bottom}>
                      <button
                        className={styles.btn_start}
                        onClick={this.resetData}
                      >
                        초기화
                      </button>
                      <input
                        type="number"
                        placeholder="데이타그리드"
                        onChange={this.onChangeSequenceTestValue}
                        className={styles.custom_input}
                      />
                      <button
                        className={styles.btn_active}
                        onClick={this.handleSequenceTest}
                      >
                        일괄실행
                      </button>
                      <input
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        value="Bike"
                        onChange={this.callApiAndClearLog}
                      />
                      <label htmlFor="vehicle1"> 측정결과저장안함</label>
                    </div>
                  </div>
                  <div className={styles.title_devextreme}>
                    <span>{"<데이타그리드/트리그리드>(Sencha)"}</span>
                  </div>
                  {/* {this.state.customerData &&
                  this.state.customerData.length &&
                  this.state.columns.length ? (
                    <div>
                      <Profiler onRender={this.callbackSencha} id="sencha">
                        <ExtGrid
                          store={this.store}
                          height="300px"
                          scrollable
                          shadow
                        >
                          {this.state.columns.map((item) => (
                            <ExtColumn
                              text={item}
                              dataIndex={item}
                              hideable={item == 'id'}
                              key={item}
                            />
                          ))}
                        </ExtGrid>
                      </Profiler>
                    </div>
                  ) : (
                    ""
                  )} */}
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
