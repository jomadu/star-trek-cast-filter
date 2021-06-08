import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGetCharacter } from "../utils";

const CharacterResultDetail = ({ uid }) => {
  const [data, isLoading, error, setUid] = useGetCharacter(uid);

  useEffect(() => {
    setUid(uid);
  }, [uid, setUid]);

  var comp;
  if (error) {
    comp = <p>Error</p>;
  } else if (isLoading) {
    comp = <p>Loading...</p>;
  } else if (data?.character) {
    var c = data.character;

    var series = new Set();

    c.episodes.forEach((e) => {
      series.add(e.series.title);
    });
    console.log(series);

    comp = (
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{c.name}</td>
          </tr>
          <tr>
            <td>Titles</td>
            <td>
              {c.titles.length ? (
                <ul>
                  {c.titles.map((title) => (
                    <li key={title.uid}>{title.name}</li>
                  ))}
                </ul>
              ) : (
                "None"
              )}
            </td>
          </tr>
          <tr>
            <td>Organizations</td>
            <td>
              {c.organizations.length ? (
                <ul>
                  {c.organizations.map((org) => (
                    <li key={org.uid}>{org.name}</li>
                  ))}
                </ul>
              ) : (
                "None"
              )}
            </td>
          </tr>
          <tr>
            <td>Series</td>
            <td>
              {series.size ? (
                <ul>
                  {[...series].map((series, i) => (
                    <li key={i}>{series}</li>
                  ))}
                </ul>
              ) : (
                "None"
              )}
            </td>
          </tr>
          <tr>
            <td># of Episodes</td>
            <td>{c.episodes.length}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return <div>{comp}</div>;
};

CharacterResultDetail.propTypes = {
  uid: PropTypes.string,
};

export default CharacterResultDetail;
