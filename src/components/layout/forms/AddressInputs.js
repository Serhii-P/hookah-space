export default function AddressInputs({
  addressProps,
  setAddressProp,
  disabled = false,
}) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <label className="mt-4 block">Phone</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone number"
        value={phone || ""}
        onChange={(ev) => setAddressProp("phone", ev.target.value)}
      />
      <label className="mt-4 block">Street address</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Street address"
        value={streetAddress || ""}
        onChange={(ev) => setAddressProp("streetAddress", ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-2 my-4 lg:grid-cols-1">
        <div>
          <label>Postal code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal code"
            value={postalCode || ""}
            onChange={(ev) => setAddressProp("postalCode", ev.target.value)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city || ""}
            onChange={(ev) => setAddressProp("city", ev.target.value)}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Country"
        value={country || ""}
        onChange={(ev) => setAddressProp("country", ev.target.value)}
      />
    </>
  );
}
