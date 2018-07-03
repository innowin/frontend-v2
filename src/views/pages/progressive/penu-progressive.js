import React from 'react'
import FontAwesome from 'react-fontawesome'

const MenuProgressive = ({activeStep, steps, status}) => (
    <div className="steps">
        {steps.map((step, index) =>
            <div key={`progressiveStepWrapper${index}`} className={(activeStep === (index + 1)) ? `progressive-step-wrapper active ${status}-step${activeStep} steps-lenght${steps.length}` : 'progressive-step-wrapper'}>
                <div className={(activeStep > index) ? 'checked progressive-step' : 'progressive-step'}>
                    {step.icon}
                    <div className="step-title">{step.title}</div>
                </div>
            </div>
        )}
    </div>
)
export default MenuProgressive
