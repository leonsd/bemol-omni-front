import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

export default function addressForm({ formik }: any) {
  return (
    <>
      <MDBRow className="mb-4">
        <MDBCol size="4">
          <MDBInput
            name="address.zipCode"
            label="Cep"
            value={formik.values.address.zipCode}
            onChange={formik.handleChange}
            type="text"
          />
          {formik.touched.address?.zipCode && formik.errors.address?.zipCode ? (
            <div className="validation-error">
              {formik.errors.address?.zipCode}
            </div>
          ) : null}
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-4">
        <MDBCol size="8">
          <MDBInput
            name="address.street"
            label="Rua"
            value={formik.values.address.street}
            onChange={formik.handleChange}
            type="text"
          />
          {formik.touched.address?.street && formik.errors.address?.street ? (
            <div className="validation-error">
              {formik.errors.address?.street}
            </div>
          ) : null}
        </MDBCol>
        <MDBCol size="4">
          <MDBInput
            name="address.number"
            label="Número"
            value={formik.values.address.number}
            onChange={formik.handleChange}
            type="text"
          />
          {formik.touched.address?.number && formik.errors.address?.number ? (
            <div className="validation-error">
              {formik.errors.address?.number}
            </div>
          ) : null}
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            name="address.complement"
            label="Complemento"
            value={formik.values.address.complement}
            onChange={formik.handleChange}
            type="text"
          />
          {formik.touched.address?.complement &&
          formik.errors.address?.complement ? (
            <div className="validation-error">
              {formik.errors.address?.complement}
            </div>
          ) : null}
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol size="4">
          <MDBInput
            name="address.neighborhood"
            label="Bairro"
            value={formik.values.address.neighborhood}
            onChange={formik.handleChange}
            type="text"
          />
          {formik.touched.address?.neighborhood &&
          formik.errors.address?.neighborhood ? (
            <div className="validation-error">
              {formik.errors.address?.neighborhood}
            </div>
          ) : null}
        </MDBCol>
        <MDBCol size="4">
          <MDBInput
            name="address.city"
            label="Cidade"
            value={formik.values.address.city}
            onChange={formik.handleChange}
            type="text"
          />

          {formik.touched.address?.city && formik.errors.address?.city ? (
            <div className="validation-error">
              {formik.errors.address?.city}
            </div>
          ) : null}
        </MDBCol>
        <MDBCol size="4">
          <MDBInput
            name="address.state"
            label="Estado"
            value={formik.values.address.state}
            onChange={formik.handleChange}
            type="text"
          />
          {formik.touched.address?.state && formik.errors.address?.state ? (
            <div className="validation-error">
              {formik.errors.address?.state}
            </div>
          ) : null}
        </MDBCol>
      </MDBRow>
    </>
  );
}
