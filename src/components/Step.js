import React, { Fragment } from 'react'
import { Row, Alert } from 'reactstrap'

const Step = ({condition, step}) => {
  const {description, url, substeps} = step
  return (
    <Row className={condition ? '' : 'd-none'}>
      <Alert color="success" className="w-100">
        <p>{ description }</p>
        {
          (substeps) ?
            substeps.map((substep, index) => (
              <Fragment key={index}>
                <p>{ substep.description }</p>
                <p><a href={substep.url}>{ substep.url }</a></p>
              </Fragment>
            ))
            : <a href={url}>{ url }</a>
        }
      </Alert>
    </Row>
  )
}

export default Step
