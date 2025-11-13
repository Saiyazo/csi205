const AppFooter = () => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center text-center bg-primary text-white p-5">
                <p className="fs-4">มหาวิทยาลัยศรีปทุม/คณะเทคโนโลยีสารสนเทศ/วิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์</p>
            </div >
            <div className="text-center text-white p-2 rounded-3 ">
                <a className="m-3" href="https://www.facebook.com/champ.nachapat" ><i class="bi bi-facebook " style={{ fontSize: '2rem' }}></i></a>
                <a className="m-3" href="https://www.instagram.com/saiya_zo" ><i class="bi bi-instagram" style={{ fontSize: '2rem' }}></i></a>
                <a className="m-3" href="https://github.com/Saiyazo"><i class="bi bi-github" style={{ fontSize: '2rem' }}></i></a>
            </div >
        </>
    );
}

export default AppFooter;