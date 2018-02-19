import React from 'react';

export const ContributionsType = ({labels}) => {
	return (
			<div>
				{labels.map((label , i) => {
					return (
					<label key={i} className="container">
						<span className ="checkmark"></span>
						<input type="checkbox"/>
						{label}
					</label>
					)}
				)}
			</div>
	)
};