import { Button, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { useFetcher } from "react-router-dom";
import { Country, State, City } from "country-state-city";

export function AddressForm({ data }) {
    const addressFetcher = useFetcher();
    const addressExists = data.id ? true : false;
    const [country, setCountry] = useState(data.country);
    const [state, setState] = useState(data.state);
    const [city, setCity] = useState(data.city);
    const countries = Country.getAllCountries();
    return (
        <div>
            <addressFetcher.Form method="POST" action={addressExists ? `/address/${data.id}/edit` : "/address/new"} >
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Address Title" />
                    </div>
                    <TextInput id="title" name="title" required defaultValue={data.title} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="firstName" value="First Name" />
                    </div>
                    <TextInput id="firstName" name="firstName" required defaultValue={data.firstName} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="lastName" value="Last Name" />
                    </div>
                    <TextInput id="lastName" name="lastName" required defaultValue={data.lastName} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="streetAddress1" value="Street Address 1" />
                    </div>
                    <TextInput id="streetAddress1" name="streetAddress1" required defaultValue={data.streetAddress1} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="streetAddress2" value="Street Address 2" />
                    </div>
                    <TextInput id="streetAddress2" name="streetAddress2" defaultValue={data.streetAddress2} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="country" value="Country" />
                    </div>
                    <Select id="country" name="country" required value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                        ))}
                    </Select>

                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="state" value="State" />
                    </div>
                    <Select id="state" name="state" required value={state} onChange={(e) => setState(e.target.value)}>
                        <option value="">Select a state</option>
                        {State.getStatesOfCountry(country).map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                        ))}
                    </Select>

                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="city" value="City" />
                    </div>
                    <Select id="city" name="city" required value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="">Select a city</option>
                        {City.getCitiesOfState(country, state).map((city) => (
                            <option key={city.name} value={city.name}>{city.name}</option>
                        ))}
                    </Select>

                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="zipCode" value="Zip Code" />
                    </div>
                    <TextInput id="zipCode" name="zipCode" required defaultValue={data.zipCode} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Phone" />
                    </div>
                    <TextInput id="phone" name="phone" defaultValue={data.phone} />
                </div>
                <input type="hidden" name="type" value={data.type} />
                <div>
                    <Button type="submit">{addressExists ? 'Update' : 'Create'}</Button>
                </div>
            </addressFetcher.Form>
        </div>
    )
}