import NotFoundImage from "../assets/img/not-found.svg";

function PageNotFoundComponent() {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt="Under development"
          src={NotFoundImage}
          style={{
            maxWidth: "100%",
          }}
        />
      </div>
    </>
  );
}

export default PageNotFoundComponent;
