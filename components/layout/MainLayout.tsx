import Header  from "./Header"
import Footer from "./Footer"

type Props = {
    children: React.ReactNode;
}

const  MainLayout = ({children}: Props) => {

    return (
        <>
            <Header/>

            <main>
                {children}
            </main>

            <Footer />
        </>
    )
}

export default MainLayout