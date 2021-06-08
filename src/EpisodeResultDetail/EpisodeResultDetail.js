import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGetEpisode } from "../utils";
import styled from "styled-components";

const StyledTable = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  & th,
  tr,
  td {
    border: 1px solid black;
  }

  & caption {
    font-weight: bold;
    margin: 3px;
  }
`;

const StyledList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
const StyledListItem = styled.li`
  padding-top: 5px;
  padding-bottom: 5px;
`;

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
      <StyledTable>
        <caption>{`${e.series.title} - S${e.seasonNumber}E${e.episodeNumber} - ${e.title}`}</caption>
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
                <StyledList>
                  {e.characters.map((c) => (
                    <StyledListItem key={c.uid}>{c.name}</StyledListItem>
                  ))}
                </StyledList>
              ) : (
                "None"
              )}
            </td>
          </tr>
          <tr>
            <td>Writers</td>
            <td>
              {e.writers.length ? (
                <StyledList>
                  {e.writers.map((w) => (
                    <StyledListItem key={w.uid}>{w.name}</StyledListItem>
                  ))}
                </StyledList>
              ) : (
                "None"
              )}
            </td>
          </tr>
          <tr>
            <td>Teleplay Authors</td>
            <td>
              {e.teleplayAuthors.length ? (
                <StyledList>
                  {e.teleplayAuthors.map((a) => (
                    <StyledListItem key={a.uid}>{a.name}</StyledListItem>
                  ))}
                </StyledList>
              ) : (
                "None"
              )}
            </td>
          </tr>
          <tr>
            <td>Story Authors</td>
            <td>
              {e.storyAuthors.length ? (
                <StyledList>
                  {e.storyAuthors.map((a) => (
                    <StyledListItem key={a.uid}>{a.name}</StyledListItem>
                  ))}
                </StyledList>
              ) : (
                "None"
              )}
            </td>
          </tr>
        </tbody>
      </StyledTable>
    );
  }

  return <div>{comp}</div>;
};

EpisodeResultDetail.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default EpisodeResultDetail;
