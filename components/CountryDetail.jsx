import React, { useEffect, useState } from 'react';
import { Link, useLocation,useParams } from 'react-router-dom';
import './CountryDetail.css';
import { useTheme } from '../hooks/useTheme';

export default function CountryDetail() {
  
  const {dark,setDark} = useTheme();
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const params = useParams();
  const countryName = params.country;
  const { state } = useLocation();
  useEffect(() => {
    async function fetchCountryDetails(data) {
      if (!data || !data.name) {
        setNotFound(true);
        return;
      }

      const countryDetails = {
        name: data.name?.common || 'Unknown',
        nativeName: data.name.nativeName
          ? Object.values(data.name.nativeName)?.[0]?.common || 'N/A'
          : 'N/A',
        population: data.population || 'N/A',
        region: data.region || 'N/A',
        subregion: data.subregion || 'N/A',
        capital: data.capital || ['N/A'],
        flag: data.flags?.svg || '',
        tld: data.tld?.[0] || 'N/A',
        languages: data.languages ? Object.values(data.languages).join(', ') : 'N/A',
        currencies: data.currencies
          ? Object.values(data.currencies).map((currency) => currency.name).join(', ')
          : 'N/A',
        borders: []
      };

      setCountryData(countryDetails);

      if (data.borders) {
        try {
          const borderNames = await Promise.all(
            data.borders.map(async (border) => {
              const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
              if (!res.ok) throw new Error(`Failed to fetch border: ${border}`);
              const [borderData] = await res.json();
              return borderData?.name?.common || 'Unknown';
            })
          );
          setCountryData((prevState) => ({
            ...prevState,
            borders: borderNames.filter(Boolean)
          }));
        } catch (err) {
          console.error('Error fetching borders:', err);
        }
      }
    }

    if (state && state.name) {
      fetchCountryDetails(state);
    } else {
      async function getCountryData() {
        try {
          const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
          if (!res.ok) {
            setNotFound(true);
            return;
          }
          const data = await res.json();
          if (!Array.isArray(data) || data.length === 0) {
            setNotFound(true);
            return;
          }
          fetchCountryDetails(data[0]);
        } catch (error) {
          console.error('Error fetching country data:', error);
          setNotFound(true);
        }
      }
      getCountryData();
    }
  }, [countryName, state]);

  if (notFound) {
    return <div>Country Not Found</div>;
  }

  return countryData === null ? (
    'Loading...'
  ) : (
    <main className={dark ? "dark":""}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => window.history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p><b>Native Name: </b>{countryData.nativeName}</p>
              <p><b>Population: </b>{countryData.population.toLocaleString('en-IN')}</p>
              <p><b>Region: </b>{countryData.region}</p>
              <p><b>Sub Region: </b>{countryData.subregion}</p>
              <p><b>Capital: </b>{countryData.capital.join(', ') || 'N/A'}</p>
              <p><b>Top Level Domain: </b>{countryData.tld}</p>
              <p><b>Currencies: </b>{countryData.currencies}</p>
              <p><b>Languages: </b>{countryData.languages}</p>
            </div>
            <div className="border-countries">
              {countryData.borders.length > 0 && (
                <b>Border Countries: 
                  {countryData.borders.map((border) => (
                    <Link key={border} to={`/${border}`}> {border} </Link>
                  ))}
                </b>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
