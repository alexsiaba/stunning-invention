import { withRouter } from 'next/router'

const Services = (props) => {
    console.log(props)
    return (
        <>
            {"services page"}
        </>
    )
}

export default withRouter(Services);