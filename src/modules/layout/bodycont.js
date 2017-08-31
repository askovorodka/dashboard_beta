export default class Bodyy extends React.Component {

	render() {

		const childrenWithProps = React.Children.map(this.props.children, (child) => (
			React.cloneElement(child, {token: this.props.token})
		))

		return (
			<div className="lt_body_cont">
					{childrenWithProps}
			</div>
		)
	}
}