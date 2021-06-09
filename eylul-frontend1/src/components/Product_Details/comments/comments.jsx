import React from 'react'

const comments = ( {item} ) => {
    console.log("item",item)
    return (
        <div>
            <div style={{ flexDirection: 'column', marginVertical: 40, paddingHorizontal: 10 }}>
          
          {item.approved === true &&<div style={{ fontSize: 18, fontWeight: 'bold' }}> {item.username}  <text style={{ fontSize: 15, marginTop: 15 ,fontWeight: '500' }}>                            {item.time} </text>    </div> } 
          {item.approved === true &&  <div><text style={{ fontSize: 15, marginTop: 15 ,fontWeight: '500' }}> {item.text} </text></div> } 
          {item.approved === true &&  <div
           style={{
             //borderBottomColor: '#BFA38F',
             borderColor: '#BFA38F',
             borderBottomWidth: 3,
             borderEndWidth: 1000,
           }}
         />} 
          
         </div>
        </div>
    )
}

export default comments
