import React from 'react'

const Invoice = ({invoice}) => {
    return (
        <div>
        <div>
      <embed src={`data:application/pdf;base64,${invoice}`} style={{width:700, height:700}} type="application/pdf" width="100%"></embed>
    </div>
      </div>
    )
}

export default Invoice
