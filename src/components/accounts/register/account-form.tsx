import { MDBCol, MDBInput, MDBRadio, MDBRow } from "mdb-react-ui-kit";

export default function accountForm({ formik }: any) {
  return (
    <>
      <MDBRow className="d-flex mb-4">
        <MDBCol size="6">
          <MDBInput
            label="Nome completo"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            type="text"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="validation-error">{formik.errors.username}</div>
          ) : null}
        </MDBCol>
        <MDBCol size="6">
          <label className="gender-label">Gênero: </label>
          <MDBRadio
            name="gender"
            id="male"
            value="male"
            checked={formik.values.gender === "male"}
            onChange={formik.handleChange}
            label="Masculino"
            inline
          />
          <MDBRadio
            name="gender"
            id="female"
            value="female"
            checked={formik.values.gender === "female"}
            onChange={formik.handleChange}
            label="Feminino"
            inline
          />
          {formik.touched.gender && formik.errors.gender ? (
            <div className="validation-error">{formik.errors.gender}</div>
          ) : null}
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol size="12">
          <MDBInput
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="validation-error">{formik.errors.email}</div>
          ) : null}
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol size="12">
          <MDBInput
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="validation-error">{formik.errors.password}</div>
          ) : null}
        </MDBCol>
      </MDBRow>
    </>
  );
}
