import React from 'react'
import { Row, Alert } from 'reactstrap'

const Step = ({condition, step}) => {
  const {description, url, substeps, requestPayload, responsePayload} = step
  return (
    <Row className={condition ? '' : 'd-none'}>
      <Alert color="success" className="w-100">
        <h4 className="font-weight-bold">{ description }</h4>
        {
          (substeps) ?
            substeps.map((substep, index) => (
              <Step key={index} condition={true} step={substep}/>
            ))
            : <a href={url}>{ url }</a>
        }
        {
          (requestPayload) ?
            <div className="mt-3">
              <label>Ejemplo de request</label>
              <pre><code>{ requestPayload }</code></pre>
            </div>
            : null
        }
        {
          (responsePayload) ?
            <div className="mt-3">
              <label>Ejemplo de respuesta</label>
              <pre><code>{ responsePayload }</code></pre>
            </div>
            : null
        }
      </Alert>
    </Row>
  )
}

export default Step
