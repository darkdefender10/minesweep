import React, { Component } from 'react';
import './minesweeper.css';
import sound from './mysound.mp3';

class Cell extends Component{

	constructor(props)
	{
		super(props);
        
        
	}

	prevDef(event)
	{
      event.preventDefault();
      this.props.onContextMenu();
	}

	decideColor()
	{
		if(this.props.status==0)
		{
			
			return (<button className="cell-closed" onClick={() => this.props.onClick()}  onContextMenu={this.prevDef.bind(this)}>
			</button>);
		}

		else if(this.props.status==2)
		{
             return (<button className="cell-marked"  onContextMenu={this.prevDef.bind(this)}>
			</button>);
		}

		else if(this.props.status==1)
		{
             return (<button className="cell-open"  >
             	{this.props.numOfMines}
			</button>);
		}

		else if(this.props.status==3)
		{
             return (<button className="cell-mine" >
             	
			</button>);
		}

		else if(this.props.status==4)
		{
             return (<button className="cell-wrong-mark" >
             	X
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

constructor(props)
{
	super(props);
	this.state = {start : false, over:false, level: "beginner", boardSize : 9, mineSize : 10, timeElapsed : 0 , status: "Yet to begin", markedMines : 0, cellsUser : get2dArray(9), cellsGame : get2dArray(9), mineCount : get2dArray(9), openedMines : 0 };
	
}



initialState()
{
	
	this.stopTimer();
	this.setState({start : false, over : false, level : "beginner", boardSize : 9, mineSize : 10, timeElapsed : 0, status: "Yet to begin", cellsUser : get2dArray(9), cellsGame : get2dArray(9), mineCount : get2dArray(9), openedMines : 0, markedMines : 0})
	
}

initialStateIntermediate()
{
	this.stopTimer();
	this.setState({start : false, over : false, level : "intermediate", boardSize : 16, mineSize : 40, timeElapsed : 0, status: "Yet to begin", cellsUser : get2dArray(16), cellsGame : get2dArray(16), mineCount : get2dArray(16), openedMines : 0, markedMines : 0})
 
}

initialStateExpert()
{
   this.stopTimer();
   this.setState({start : false, over : false, level : "expert", boardSize : 24, mineSize : 99, timeElapsed : 0, status: "Yet to begin", cellsUser : get2dArray(24), cellsGame : get2dArray(24), mineCount : get2dArray(24), openedMines : 0, markedMines : 0})
   
}


startTimer()
{
	this.timerID = setInterval(
      () => this.tick(),
      1000
    );
}

tick()
{
	let newtime = this.state.timeElapsed + 1;
	this.setState({timeElapsed : newtime});
}

stopTimer()
{
	clearInterval(this.timerID);

}

revealMines()
{
	var newarr = this.state.cellsUser.slice();
	var gamearr = this.state.cellsGame;
	var userarr = this.state.cellsUser.slice();
	

	for(let i=0;i<this.state.boardSize;i++)
	{
		for(let j=0;j<this.state.boardSize;j++)
		{
			if(gamearr[i][j]==1)
			{
				newarr[i][j]=3;
			}

			else if(gamearr[i][j]==0 && userarr[i][j]==2)
			{
                 newarr[i][j]=4;
			}
		}
	}

	this.setState({cellsUser:newarr});
}

markMines()
{
	var newarr = this.state.cellsUser.slice();
	var gamearr = this.state.cellsGame;
	var tot = this.state.mineSize;

	for(let i=0;i<this.state.boardSize;i++)
	{
		for(let j=0;j<this.state.boardSize;j++)
		{
			if(gamearr[i][j]==1)
			{
				newarr[i][j]=2;
			}
		}
	}

	this.setState({cellsUser:newarr, markedMines:tot});
}

handleRightClick(i,j)
{
	
	if(!this.state.over)
	{
       if(this.state.cellsUser[i][j]==0)
	
	{
		let newArr = this.state.cellsUser.slice();
		newArr[i][j] = 2;
		let newMarkCount = this.state.markedMines + 1;
		this.setState({cellsUser : newArr, markedMines : newMarkCount});
	}

	else if(this.state.cellsUser[i][j]==2)
	{
		let newArr = this.state.cellsUser.slice();
		newArr[i][j] = 0;
		let newMarkCount = this.state.markedMines - 1;
		this.setState({cellsUser : newArr, markedMines : newMarkCount});
	}
    }
}

handleChange(event)
{
	let l = event.target.value;
	event.preventDefault();
    
    if(l=="beginner")
    {
    	this.initialState();
    }

    else if(l=="intermediate")
    {
    	this.initialStateIntermediate();
    }

    else if(l=="expert")
    {
    	this.initialStateExpert();
    }
    

}

handleClick(i,j){



	if(!this.state.start && !this.state.over)
	{
		
		let newcells = populateBoard(i,j,this.state.boardSize,this.state.mineSize);
		
        let newOpenCount = this.state.openedMines + 1;
		let usercells =  get2dArray(this.state.boardSize);
		let countmine = this.state.mineCount.slice();
		usercells[i][j] =1;
		let returnvar = openEmptyCells2(usercells, newcells,countmine, i,j, this.state.boardSize, newOpenCount); 
		usercells = returnvar[0];
		newOpenCount = returnvar[1];
        countmine = returnvar[2];
      
		this.startTimer();
        this.setState({start : true, cellsUser : usercells, cellsGame : newcells, openedMines : newOpenCount,status: "Game in Progress" });
		
	}

	else if(this.state.start && !this.state.over)
	{
		if(this.state.cellsGame[i][j]==0)
		{
			
				  let newOpenCount = this.state.openedMines + 1;
			      let usercells = this.state.cellsUser.slice();
			      let countmine = this.state.mineCount.slice();
		          usercells[i][j] =1;
		          let returnvar = openEmptyCells2(usercells, this.state.cellsGame, countmine, i,j, this.state.boardSize, newOpenCount); 
		          usercells = returnvar[0];
		          newOpenCount = returnvar[1];
		          countmine = returnvar[2];
		   
			      
			      
		          
		          if(newOpenCount==((this.state.boardSize*this.state.boardSize) - this.state.mineSize))
		          {
                      this.setState({mineCount : countmine, cellsUser : usercells, openedMines : newOpenCount, over : true, status : "You Win"});
                      this.markMines();
                      this.stopTimer();

		          }
		          else
		          {

                    this.setState({mineCount : countmine, cellsUser : usercells, openedMines : newOpenCount});
		          }
		      
		}

		else if(this.state.cellsGame[i][j]==1)
		{
			
			this.revealMines();
			this.setState({over : true, status : "You Lost"});
			this.stopTimer();

			
		}
	}

}

createBoard(num)
{
	
	var k =[];
	for(let j=0;j<this.state.boardSize;j++)
	{
      k.push(this.createRows(j));
	}

	return (<div key={this.state.boardSize*100}> {k} </div>);
}

createRows(rownum)
{
	var m = [];
	
	for(let i=0;i<this.state.boardSize;i++)
	{
		 m.push(<Cell key={rownum*this.state.boardSize + i} status={this.state.cellsUser[rownum][i]} numOfMines={this.state.mineCount[rownum][i]} onClick={() => this.handleClick(rownum,i)} onContextMenu={() => this.handleRightClick(rownum,i)}   />);
	}

	return (<div className="board-row" key={rownum}>  {m} </div> );
}




getNewGame()
{
	if(this.state.level=="beginner")
	{
		return <button className="footer-elem" onClick={this.initialState.bind(this)} > New Game </button>;
	}

	else if(this.state.level=="intermediate")
	{
		return <button className="footer-elem" onClick={this.initialStateIntermediate.bind(this)} > New Game </button>;
	}

	else if (this.state.level=="expert") 
	{
		return <button className="footer-elem" onClick={this.initialStateExpert.bind(this)} > New Game </button>
	}
}




	render()
	{
		return(
			     <div className="page">
			     <header> <h1> MINESWEEPER </h1> </header>
			     
			     <div className="board">
			     <audio id="beep" controls preload="auto">
              
              <source src={sound} type="audio/mp3" />
               Your browser does not support the audio tag.
            </audio>
                <div className="controls"> {this.getNewGame()}
                       <input type="text" value={this.state.mineSize-this.state.markedMines} className="footer-elem" readonly/>
                       <button className="footer-elem">  {this.state.status} </button>
                       <input type="text" className="footer-elem" readonly value={this.state.timeElapsed} />
                       <select value={this.state.level} className="footer-elem" onChange={this.handleChange.bind(this)}>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="expert">Expert</option>
                         
                       </select>
                       
 
                       
                 </div>
                 
			     {this.createBoard(3)}
			     </div>
			     
			     </div>
			     
			
       
			
			);
	
	}
}

class Minesweeper extends Component {

	

  render() {

    return (
      
      <MyBoard size={9} mines={10 } />
      
      
    );
  }
}

function populateBoard(i,j,size,mines)
{
	var newcells = get2dArray(size);

	var k=0;
    var top = size-1;
	 while(k<mines)
	 {
	 	var a =  Math.floor( Math.random() * ( 1 + top - 0) ) + 0;
        var b =  Math.floor( Math.random() * ( 1 + top - 0) ) + 0;
       if(newcells[a][b]==0 && (a < i-1 || a >i+1) && (b < j-1 || b >j+1) )
       {
       	 newcells[a][b] = 1; 
       	 
       	 k++;
       }
     
	 }
    
	return newcells;
}

function calculateNeighbouringMines(i,j,arr,size)
{
   var count =0;
   var top = size-1;
   var rowStart = i-1, rowEnd = i+1, colStart = j-1, colEnd = j+1;
   if(rowStart < 0)
   {
   	rowStart=0;
   }
   if(colStart < 0)
   {
   	colStart=0;
   }

   if(rowEnd > top)
   {
   	rowEnd=top;
   }
   if(colEnd > top)
   {
   	colEnd=top;
   }

for(let x=rowStart;x<=rowEnd;x++)
{
	for(let y=colStart;y<=colEnd;y++)
	{
		if(arr[x][y]==1)
		{
          count++;
		}
	}
}


   
   
   
   return count;


}


function openEmptyCells2(userarr, isminearr,countminearr,i,j,size, open)
{
   
   var count = calculateNeighbouringMines(i,j,isminearr,size);
   countminearr[i][j] = count;
   var returnarr = [userarr,open,countminearr];
   
   if(count==0)
   {
     
   	 var top = size-1;
     var rowStart = i-1, rowEnd = i+1, colStart = j-1, colEnd = j+1;
      if(rowStart < 0)
         {
   	        rowStart=0;
         }
      if(colStart < 0)
         {
   	        colStart=0;
         }

      if(rowEnd > top)
         {
   	        rowEnd=top;
         }
      if(colEnd > top)
         {
        	colEnd=top;
         }

      for(let x=rowStart;x<=rowEnd;x++)
           {
	          for(let y=colStart;y<=colEnd;y++)
	            {
		           if(userarr[x][y]!=1)
		              {
                         userarr[x][y] = 1;
                         
                         open = open + 1;
                         let c= calculateNeighbouringMines(i,j,isminearr,size);
                         if(c==0)
                         {
                         	returnarr = openEmptyCells2(userarr,isminearr,countminearr,x,y,size,open);
                         	open = returnarr[1];
                         	userarr = returnarr[0];
                         	countminearr = returnarr[2];
                         }

                         else
                         {
                         	countminearr[x][y] = c;
                         	returnarr[2] = countminearr;
                         }
                     
		              }
	            }
           }
   }

   return returnarr;
}

function get2dArray(size)
{
	var arr = Array(size).fill(null);
	for(let c = 0;c<size;c++)
	{
		arr[c] = Array(size).fill(0);
	}
return arr;
}

export default Minesweeper;