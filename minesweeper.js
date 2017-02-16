import React, {Component} from 'react';
import './minesweeper.css';

class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            row: this.props.row,
            column: this.props.column,
            value: 0
        }


    }

    decideColor() {
        if (this.state.value == 0) {

            return (<button className="cell-closed" onClick={() => this.handleClick()}>
            </button>);
        }

        else if (this.state.value == 2) {
            return (<button className="cell-marked" onClick={() => this.handleClick()}>
            </button>);
        }

        else if (this.state.value == 1) {
            return (<button className="cell-open" onClick={() => this.handleClick()}>

            </button>);
        }
    }

    handleClick(i, j) {


        if (!this.state.start) {
            alert(i + " " + j);

            this.setState({start: true, value: 1});

        }

        else if (this.state.start) {
            if (this.state.cellsGame[i][j] == 0) {
                alert("not here");
                let usercells = this.state.cellsUser.slice();
                usercells[i][j] = 1;
                let count = calculateNeighbouringMines(i, j, this.state.cellsGame);
                let countmine = this.state.mineCount.slice();
                countmine[i][j] = count;
                this.setState({start: true, value: 1});
            }
        }

    }

    render() {
        return (

            this.decideColor()
        );
    }
}

class MyBoard extends Component {

    constructor() {
        super();
        this.state = {
            start: false,
            cellsUser: Array(3).fill(Array(3).fill(0)),
            cellsGame: Array(3).fill(Array(3).fill(0)),
            mineCount: Array(3).fill(Array(3).fill(0))
        };

    }


    renderSquare(i, j) {

        return <Cell row={i} column={j}/>
    }


    render() {
        return (


            <div>
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                </div>
            </div>


        );

    }
}

class Minesweeper extends Component {
    render() {

        return (

            <MyBoard />

        );
    }
}

function populateBoard(i, j) {
    var newcells = Array(3).fill(Array(3).fill(0));

    var k = 0;

    var a = Math.floor(Math.random() * ( 1 + 2 - 0)) + 0;
    var b = Math.floor(Math.random() * ( 1 + 2 - 0)) + 0;

    newcells[1][1] = 1; //here is the error
    alert(a + " " + b);


    printArray(newcells); //we print the array here, 3 elements are assigned the value of 1, instead of just 1 element
    return newcells;
}

function calculateNeighbouringMines(i, j, arr) {
    var count = 0;

    for (let k = -1; k < 2; k++) {
        if (i + k > -1 && i + k < 3) {
            if (arr[i + k][j] == 1) {
                count++;
            }
        }
    }

    for (let m = -1; m < 2; m++) {
        if (i + m > -1 && i + m < 3) {
            if (arr[i][j + m] == 1) {
                count++;
            }
        }
    }
    return count;


}

function printArray(arr) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            alert(i + " " + j + " " + arr[i][j]);
        }
    }
}

export default Minesweeper;