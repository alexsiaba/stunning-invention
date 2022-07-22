import { useRouter } from 'next/router'

const CatchAll = (props) => {
    const router = useRouter()
    console.log(router)

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return <div>Loading...</div>

}

// This function gets called at build time
export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: ['vacation-home-services'] } },
            { params: { slug: ['2'] } }
        ],
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    console.log(params)
    const post = {}
    return {
        props: { post },
    }
}

export default CatchAll