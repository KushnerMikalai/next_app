import { useRouter } from 'next/router'

function Error() {
    const router = useRouter()
    const { error } = router.query

    return <div>Error code: {error}</div>
}

export default Error
