import React, { ReactNode } from 'react'
// default props:
// predefine them in a var:
const defaultContainerProps = {
	heading: <strong>Hi</strong>,
}

type ContainerProps = { children: ReactNode } & typeof defaultContainerProps

export const Container = ({ heading, children }: ContainerProps) => {
	return (
		<div>
			<h1>{heading}</h1>
			{children}
		</div>
	)
}

Container.defaultProps = defaultContainerProps
