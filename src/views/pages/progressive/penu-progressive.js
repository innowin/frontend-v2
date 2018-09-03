import React from 'react'


const MenuProgressive = ({activeStep, steps, status, stepsClassName}) => {
    return (
        <div className={`steps ${stepsClassName}`}>
            {steps && steps.map((step, index) =>
                <div
                    key={`progressiveStepWrapper${index}`}
                    className={(activeStep > index) ?
                        `progressive-step-wrapper active ${status}-step${index + 1} steps-lenght${steps.length}`
                        : 'progressive-step-wrapper'
                    }
                >
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
