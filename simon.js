import React, { Component } from 'react';
import './simon.css';
import sound from './mysound2.mp3';
import gameOverSound from './gameover.mp3'



class Myheader extends Component{
	render()
	{
		return (<header> <h1> SIMON </h1> </header>);
	}
}

class Cell extends Component{
	
    
    render()
	{
		return (<button className={this.props.col} onClick={this.props.onClick} />);
	}
}

class MyContent extends Component{

	constructor(props)
	{
		super(props);
	    this.count =0;
	 	this.state = {boardColor : ["cell-red","cell-yellow","cell-blue","cell-green"], gameArr : [], boardColor2 : ["cell-red","cell-yellow","cell-blue","cell-green"], start:false, userTurn : false, score:0};
	}

	animate(index)
	{
		

       if(index < this.state.gameArr.length && this.state.userTurn===false)
       {
       	 
       	 const newcolor = this.state.boardColor.slice();
         newcolor[this.state.gameArr[index]] = newcolor[this.state.gameArr[index]]+'-act';
         this.beepSound.play();
         this.setState({boardColor:newcolor}, setTimeout(()=>{const oldcolor = this.state.boardColor.slice(); oldcolor[this.state.gameArr[index]] = this.state.boardColor2[this.state.gameArr[index]]; this.setState({boardColor:oldcolor}, setTimeout(()=>{this.animate(index+1);},500));}, 300));
         
       }

       else if(index===this.state.gameArr.length)
       {
       	  this.setState({userTurn:true});
       }
    }

	

	start()
	{
		
		const newarr = this.state.gameArr.slice();
	    newarr.push(getRandomNumber());
		this.setState({gameArr:newarr, start:true}, setTimeout(()=>{this.animate(0);},500));
		
	}

	newGame()
	{
		this.setState({score:0,userTurn:false,gameArr:[],start:false,boardColor : ["cell-red","cell-yellow","cell-blue","cell-green"]});
	}

	

	handleClick(i)
	{

		
		if(this.state.userTurn===true)
		{

		   this.beepSound.play();
           if(this.count < this.state.gameArr.length-1)
           {

           	 if(i===this.state.gameArr[this.count])
           	 {
           	 	this.count = this.count + 1;
           	 }

           	 else
           	  {
           	  	 setTimeout(()=>{this.overSound.play();},300);
           	  	 this.count=0;
           	  	 this.setState({userTurn:false,gameArr:[],start:false,score:0});
           	  }
           }

           else if(this.count ===this.state.gameArr.length - 1)
           {
           	

           	  if(i===this.state.gameArr[this.state.gameArr.length-1])
           	  {
           	  	this.count =0;
           	  	let newscore = this.state.score + 1;
           	  	this.setState({userTurn:false, score:newscore}, setTimeout(()=>{this.start()},1000));
           	  }

           	  else
           	  {
           	     setTimeout(()=>{this.overSound.play();},300);
           	     this.count=0; 
           	  	 this.setState({userTurn:false,gameArr:[],start:false,score:0});
           	  }
           }
		}
	}


	renderStateButton()
	{
		if(!this.state.start)
		{
			return (<button className="footer-elem" onClick={this.start.bind(this)}> Start </button>);
		}

		else
		{
			return (<button className="footer-elem" onClick={this.newGame.bind(this)}> New Game </button>);
		}
	}

    render()
	{
		return(<section> 
			
			<div className="board">
			<div className="board-footer">
			  {this.renderStateButton()}
			  <button className="footer-elem"> Score : {this.state.score}</button>
			 


			</div>
			  <div className="board-row">
			     <Cell col={this.state.boardColor[0]} onClick={()=> this.handleClick(0)}/>
			     <Cell col={this.state.boardColor[1]} onClick={()=> this.handleClick(1)}/>
			     </div>
			    <div className="board-row">
			     <Cell col={this.state.boardColor[2]} onClick={()=> this.handleClick(2)}/>
			     <Cell col={this.state.boardColor[3]} onClick={()=> this.handleClick(3)}/>
			     </div>

			 </div>
			<audio controls="controls" id="beep" ref={(audio)=>{this.beepSound = audio;}}>
              
              <source src={sound} type="audio/mp3" />
               Your browser does not support the audio tag.
            </audio>

            <audio controls="controls" id="gameOver" ref={(audio)=>{this.overSound = audio;}}>
              
              <source src={gameOverSound} type="audio/mp3" />
               Your browser does not support the audio tag.
            </audio>
            
			</section>);
	}
}

class Simon extends Component{

	render()
	{
		return (<div><Myheader/>
			<MyContent/></div>);
	}
}

function getRandomNumber()
{
	let a =  Math.floor( Math.random() * ( 1 + 3 - 0) ) + 0;
	return a;
}

export default Simon;