import { ReactElement, ReactNode } from 'react'

// conventional props:
export const Heading = ({ title }: { title: string }) => {
	return <h1>{title}</h1>
}

// with children (<Element>CHILDREN<Element/> as opposed to <Element prop=value />)

export const HeadingWithChildren = ({ children }: { children: ReactNode }): ReactElement => {
	return <h1>{children}</h1>
}
