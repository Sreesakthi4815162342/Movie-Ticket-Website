
const generateSeatMap=(rows,columns)=>{
    const seatMap=[];

    for(let row=0;row<rows;row++){
        for(let col=0;col<columns;col++){
            const seatNumber=String.fromCharCode(65+row)+(col+1)

            let seatType;
            let seatPrice;

            if(row<3){
                seatType='vip'
                seatPrice=230
            }else if(row<6){
                seatType='premium'
                seatPrice=180
            }else{
                seatType='regular'
                seatPrice=110
            }


            seatMap.push({
                seatNumber,
                type:seatType,
                price:seatPrice
            })
        }
    }
    return seatMap;
}

module.exports={
    generateSeatMap
}