import React, { Component } from 'react';
import './minesweeper.css';

class Cell extends Component{

	constructor(props)
	{
		super(props);
        
        
	}

	decideColor()
	{
		if(this.props.value==0)
		{
			return (<button className="cell-closed" onClick={() => this.props.onClick()} >
			</button>);
		}

		else if(this.props.value==2)
		{
             return (<button className="cell-marked" onClick={() => this.props.onClick()} >
			</button>);
		}

		else if(this.props.value==1)
		{
             return (<button className="cell-open" onClick={() => this.props.onClick()} >
             	{this.props.mines}
			</button>);
		}
	}

	render(){
		return(

              this.decideColor()
			);
	}
}

class MyBoard extends Component{

constructor()
{
	super();
	this.state = {start : false, cellsUser : Array(9).fill(Array(9).fill(0)), cellsGame : Array(9).fill(Array(9).fill(0)), mineCount : Array(9).fill(Array(9).fill(0)) };
	
}

handleClick(i,j){



	if(!this.state.start)
	{
		alert(i+" "+j);
		let newcells = populateBoard(i,j);
		

		let usercells =  Array(9).fill(Array(9).fill(0));
		usercells[i][j] =1;


		this.setState({start : true,  cellsUser : usercells, cellsGame : newcells,});
		
	}

	else if( this.state.start)
	{
		if(this.state.cellsGame[i][j]==0)
		{
			alert("not here");
			let usercells = this.state.cellsUser.slice();
		    usercells[i][j] =1;
			let count = calculateNeighbouringMines(i,j, this.state.cellsGame);
			let countmine = this.state.mineCount.slice();
		    countmine[i][j] =count;
		    this.setState({start : true, mineCount : countmine, cellsUser : usercells});
		}
	}

}

createBoard(num)
{
	
	var k =[];
	for(let j=0;j<num;j++)
	{
      k.push(this.createRows(j));
	}

	return (<div key={num*100}> {k} </div>);
}

createRows(rownum)
{
	var m = [];
	
	for(let i=0;i<9;i++)
	{
		 m.push(<Cell key={rownum*9 + i} value={this.state.cellsUser[rownum][i]} onClick={()=>this.handleClick(rownum,i)} mines={this.state.mineCount[rownum][i]}/>);
	}

	return (<div className="board-row" key={rownum}>  {m} </div> );
}




	render()
	{
		return(
			
			
			this.createBoard(9)

			
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

function populateBoard(i,j)
{
	var newcells = Array(9).fill(Array(9).fill(0));
	var k=0;
	while(k<10)
	{
       let a =  Math.floor( Math.random() * ( 1 + 8 - 0) ) + 0;
       let b =  Math.floor( Math.random() * ( 1 + 8 - 0) ) + 0;

       //alert("here");
         if((newcells[a][b]==0 && a > (i+1) || a < (i-1)) && (b > (j+1) || b < (j-1)))
         {
       	   newcells[a][b] = 1;
       	   
       	   k++;
       	 }
       	
       

	}

	return newcells;
}

function calculateNeighbouringMines(i,j,arr)
{
   var count =0;

   for(let k=-1;k<2;k++)
   {
   	 if(i+k > -1 && i+k < 9)
   	 {
   	  if(arr[i+k][j] == 1)
   	  {
   	  	count++;
   	  }
   	}
   }

   for(let m=-1;m<2;m++)
   {
   	if(i+m > -1 && i+m < 9)
   	 {
   	  if(arr[i][j+m] == 1)
   	  {
   	  	count++;
   	  }
   	}
   }
return count;


}

export default Minesweeper;
