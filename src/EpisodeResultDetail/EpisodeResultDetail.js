import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGetEpisode } from "../utils";

const EpisodeResultDetail = ({ uid }) => {
  const [data, isLoading, error, setUid] = useGetEpisode(uid);

  useEffect(() => {
    setUid(uid);
  }, [uid, setUid]);

  var comp;
  if (error) {
    comp = <p>Error</p>;
  } else if (isLoading) {
    comp = <p>Loading...</p>;
  } else if (data?.episode) {
    var e = data.episode;

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
            <td>Title</td>
            <td>{e.title}</td>
          </tr>
          <tr>
            <td>Series</td>
            <td>{e.series.title}</td>
          </tr>
          <tr>
            <td>Season #</td>
            <td>{e.seasonNumber}</td>
          </tr>
          <tr>
            <td>Episode #</td>
            <td>{e.episodeNumber}</td>
          </tr>
          <tr>
            <td>US Air Date</td>
            <td>{e.usAirDate}</td>
          </tr>
          <tr>
            <td>Characters</td>
            <td>
              {e.characters.length ? (
                <ul>
                  {e.characters.map((c) => (
                    <li key={c.uid}>{c.name}</li>
                  ))}
                </ul>
              ) : (
                "None"
              )}
            </td>
          </tr>
          <tr>
            <td>Writers</td>
            <td>
              {e.writers.length ? (
                <ul>
                  {e.writers.map((w) => (
                    <li key={w.uid}>{w.name}</li>
                  ))}
                </ul>
              ) : (
                "None"
              )}
            </td>
          </tr>
          <tr>
            <td>Teleplay Authors</td>
            <td>
              {e.teleplayAuthors.length ? (
                <ul>
                  {e.teleplayAuthors.map((a) => (
                    <li key={a.uid}>{a.name}</li>
                  ))}
                </ul>
              ) : (
                "None"
              )}
            </td>
          </tr>
          <tr>
            <td>Story Authors</td>
            <td>
              {e.storyAuthors.length ? (
                <ul>
                  {e.storyAuthors.map((a) => (
                    <li key={a.uid}>{a.name}</li>
                  ))}
                </ul>
              ) : (
                "None"
              )}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return <div>{comp}</div>;
};

EpisodeResultDetail.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default EpisodeResultDetail;
