import React from "react";

import { Layout } from "@/components/Layout";
import { Meta } from "@/components/Meta";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { useSiteMetadata } from "@/hooks";
import 'katex/dist/katex.min.css';

const MAX_DIM = 20;

// TODO: upgrade to Functional Component
class MatrixTemplate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rows: 2,
        cols: 2,
        rowText: 2, // rowText and colText are based on user input. They may not be valid
        colText: 2,
        matrixVals: [["1", "0"], ["0", "1"]],
        matrixCode: '\\begin{bmatrix} \n1 & 0 \\\\ \n0 & 1 \\\\ \n\\end{bmatrix}'
      };
    }
  
    getMatrixCode = (matrixVals) => {
      let result = '\\begin{bmatrix}\n';
      for (var i = 0; i < matrixVals.length; i++) {
          let row = matrixVals[i];
          let line = row.join(' & '); 
          // two backslashes and a newline
          if (i < matrixVals.length - 1) {
              line += ' \\\\';
          }
          result += line + '\n';
      }
      result += '\\end{bmatrix}';
      
      return result;
    }
  
    setMatrix = (val) => {
      let matrixVals = this.state.matrixVals;
      const rows = matrixVals.length;
      const cols = matrixVals[0].length;
  
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          matrixVals[i][j] = val;
        }
      }
  
      this.setState({matrixVals: matrixVals})
      this.setState({matrixCode: this.getMatrixCode(matrixVals)})
    }
  
    zeroMatrix = () => {
      this.setMatrix("0");
    }
  
    onesMatrix = () => {
      this.setMatrix("1");
    }
  
    idMatrix = () => {
      let matrixVals = this.state.matrixVals;
      const rows = matrixVals.length;
      const cols = matrixVals[0].length;
  
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          matrixVals[i][j] = (i === j) ? "1" : "0";
        }
      }
      this.setState({matrixVals: matrixVals})
      this.setState({matrixCode: this.getMatrixCode(matrixVals)})
    }
  
    updateMatrixVals = () => {
      const rows = this.state.matrixVals.length;
      const cols = this.state.matrixVals[0].length;
      const newRows = this.state.rows;
      const newCols = this.state.cols;
      let matrixVals = this.state.matrixVals;
      console.log([rows, cols, newRows, newCols])
      // only one of rows, cols changes at a time
      if (newRows !== rows) {
          if (newRows > rows) {
              for (let i = 0; i < newRows - rows; i++) {
                  matrixVals.push(new Array(cols).fill('0'));
              }
          } else {
              matrixVals = matrixVals.slice(0, newRows);
          }
      }
      if (newCols !== cols) {
          if (newCols > cols) {
              for (let i = 0; i < rows; i++) {
                  matrixVals[i] = matrixVals[i].concat(new Array(newCols - cols).fill('0'));
              }
          } else {
              for (let i = 0; i < rows; i++) {
                  matrixVals[i] = matrixVals[i].slice(0, newCols);
              }
          }
      }
  
      this.setState({matrixVals: matrixVals})
      this.setState({matrixCode: this.getMatrixCode(matrixVals)})
    };
  
    isNormalInteger = (str) => {
      return /^\+?(0|[1-9]\d*)$/.test(str);
    }
  
    updateRowsInput = (e) => {
      this.setState({rowText: e.target.value});
      if (!this.isNormalInteger(e.target.value)) {
        return;
      }
      let num = parseInt(e.target.value);
      if (isNaN(num) || num <= 0) {
        return;
      }
      if (num > MAX_DIM) {
        num = MAX_DIM;
        this.setState({rowText: MAX_DIM});
      }
      this.setState({rows: num}, this.updateMatrixVals);
    }
  
    updateColsInput = (e) => {
      this.setState({colText: e.target.value});
      if (!this.isNormalInteger(e.target.value)) {
        return;
      }
      let num = parseInt(e.target.value);
      console.log(num);
      if (isNaN(num) || num <= 0) {
        return;
      }
      if (num > MAX_DIM) {
        num = MAX_DIM;
        this.setState({colText: MAX_DIM});
      }
      this.setState({cols: num}, this.updateMatrixVals);
    }
    
    render() {
      return (
        <div>
          <div style={{paddingBottom: '4px'}}>
          Rows: <input
                    type="number"
                    value={this.state.rowText}
                    onChange={this.updateRowsInput}
                    min="1"
                    max="20"/>
          </div> 
          <div>
            Cols: <input
                    type="number"
                    value={this.state.colText}
                    onChange={this.updateColsInput}
                    min="1"
                    max="20"/>
          </div> 
          <div style={{margin: '1em'}}>
            <InlineMath math={this.state.matrixCode} />
          </div>
  
          <div>
            <button onClick={this.zeroMatrix}>Zeros</button>
            <button onClick={this.onesMatrix}>Ones</button>
            <button onClick={this.idMatrix}>Identity</button>
          </div>
  
          <h4>LaTeX Code:</h4>
          <code style={{display: "block", whiteSpace: "pre-wrap" }}>
            {this.state.matrixCode}
          </code>
        </div>
      );
    }
  }

export default MatrixTemplate;
