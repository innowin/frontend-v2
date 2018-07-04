import React from 'react'
import FontAwesome from 'react-fontawesome'

const MenuProgressive = ({activeStep, steps, status}) => {
    const wrapperClasses = (idx) => {
        let classes = 'progressive-step-wrapper'
        if (activeStep > idx) {
            classes += ` active ${status}-step${idx + 1} steps-lenght${steps.length}`
        }
    }
    return (
        <div className="steps">
            {steps.map((step, index) =>
                <div key={`progressiveStepWrapper${index}`} className={(activeStep > index) ? `progressive-step-wrapper active ${status}-step${index + 1} steps-lenght${steps.length}` : 'progressive-step-wrapper'}>
                    <div className={(activeStep > index) ? 'checked progressive-step' : 'progressive-step'}>
                        {step.icon}
                        <div className="step-title">{step.title}</div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default MenuProgressive
