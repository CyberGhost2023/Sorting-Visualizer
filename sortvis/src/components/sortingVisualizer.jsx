import React, { Component } from 'react';

class SortingVisual extends Component {
    constructor(props) {
        super(props);
        this.state = { array:[],color:[],rend:0,delay:100 }
    }
    componentDidMount(){
        this.resetArray(25,1,500);
    }
   
    getRandomNumber=(mini,maxi)=>{
        return  Math.floor(Math.random() *(maxi-mini+1)+mini);
    }
    
    timeout=(delay)=> {
        return new Promise( res => setTimeout(res, delay) );
    }  

    resetArray = (arrayLen, minValue, maxValue)=>{
       const arr= new Array(arrayLen);
       const col=new Array(arrayLen);
        for(let i=1;i<=arrayLen;i++)
        {
            arr[i-1]=(this.getRandomNumber(minValue,maxValue));
        }
        this.setState({array:arr,color:col});
    }
   
    
    changeColor=(ind,col)=>
    {
        document.getElementsByClassName("barvalues")[ind].style.backgroundColor=col;
        this.setState(prevState=>{
            prevState.color[ind]=col;
            return {color:prevState.color};
        })
    }

    swapValues=async(ind1,ind2)=>
    {
        const temp1 = parseInt(document.getElementsByClassName("barvalues")[ind1].style.height.slice(0,-2));
        const temp2= parseInt(document.getElementsByClassName("barvalues")[ind2].style.height.slice(0,-2));
        document.getElementsByClassName("barvalues")[ind1].style.height=`${temp2}px`;
        document.getElementsByClassName("barvalues")[ind2].style.height=`${temp1}px`;
        // document.getElementsByClassName("barvalues")[ind1].innerText = temp2-17;
        // document.getElementsByClassName("barvalues")[ind2].innerText = temp1-17;
        const {array:ar,delay}= this.state;
        ar[ind2]=temp1-17;
        ar[ind1]=temp2-17;
        this.setState({array:ar}, await(this.timeout(delay)));
    }
  
    
    SelectionSort=async ()=>{
        const {array,delay}=this.state;
        for(let i=0;i<array.length;i++)
        {
            this.changeColor(i,"BlueViolet");
            await(this.timeout(delay));
            for(let j=i+1;j<array.length;j++)
            {
                const temp1 = parseInt(document.getElementsByClassName("barvalues")[i].style.height.slice(0,-2));
                const temp2 = parseInt(document.getElementsByClassName("barvalues")[j].style.height.slice(0,-2));
                if(temp1>temp2)
                {
                    this.changeColor(j,"chocolate");
                    await(this.timeout(delay));
                    this.changeColor(j,"orange");
                    this.swapValues(i,j);
                    await(this.timeout(delay));
                }
                else
                {
                    this.changeColor(j,"red");
                    await(this.timeout(delay));
                    this.changeColor(j,"orange");
                    await(this.timeout(delay));
                }
            }
            this.changeColor(i,"indigo");
            await(this.timeout(delay));
        }
        
    }

    BubbleSort=async ()=>{
        const {array,delay}=this.state;
        for(let i=0;i<array.length;i++)
        {
            for(let j=0;j<array.length-i-1;j++)
            {
                const temp1 = parseInt(document.getElementsByClassName("barvalues")[j].style.height.slice(0,-2));
                const temp2 = parseInt(document.getElementsByClassName("barvalues")[j+1].style.height.slice(0,-2));
                if(temp1>temp2)
                {
                    this.changeColor(j,"blue");
                    this.changeColor(j+1,"grey");
                    await(this.timeout(delay));
                    this.changeColor(j,"orange");
                    this.changeColor(j+1,"orange");
                    this.swapValues(j+1,j);
                    await(this.timeout(delay));
                }
                else
                {
                    this.changeColor(j,"red");
                    this.changeColor(j+1,"red");

                    await(this.timeout(delay));
                    this.changeColor(j,"orange");
                    this.changeColor(j+1,"orange");
                    await(this.timeout(delay));
                }
            }
            this.changeColor(array.length-i-1,"green");
            await(this.timeout(delay));
        }
        
    }

    InsertionSort=async ()=>{
        const {array,delay}=this.state; 
        for(let i=0;i<array.length;i++)
        {
            let j=i-1;
            let cur=i;
            while(j>=0 && array[j]>array[cur])
            {
                this.changeColor(cur,"blue");
                await(this.timeout(delay));
                this.changeColor(j,"pink");
                await(this.timeout(delay));
                this.swapValues(cur,j);
                this.changeColor(cur,"green");
                this.changeColor(j,"green");
                await(this.timeout(delay));
                cur=j;
                j--;
            }
            this.changeColor(cur,"green");
        }
        
    }


    render() { 
        const {array,color}=this.state;
        
        return (  
            <div className="screen">
            <div className="barContainer">
            {array.map((ele,idx) => {return <div className="barvalues" style={{height:(ele+17)+'px'}} key={idx}></div>})}
            </div>
            <div className="btnList">
            <button onClick={this.SelectionSort}>Selection Sort</button>
            <button onClick={this.BubbleSort}>Bubble Sort</button>    
            <button onClick={this.InsertionSort}>Insertion Sort</button>   
            {/* <button onClick={()=>this.resetArray(25,1,500)}>Reset Array</button>     */}
            </div> 

            </div>

        );
    }
}
 
export default SortingVisual;