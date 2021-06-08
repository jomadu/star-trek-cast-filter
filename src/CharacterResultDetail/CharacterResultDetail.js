import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGetCharacter } from "../utils";
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

    comp = (
      <StyledTable>
        <caption>{c.name}</caption>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Titles</td>
            <td>
              {c.titles.length ? (
                <StyledList>
                  {c.titles.map((title) => (
                    <StyledListItem key={title.uid}>
                      {title.name}
                    </StyledListItem>
                  ))}
                </StyledList>
              ) : (
                "None"
              )}
            </td>
          </tr>
          <tr>
            <td>Organizations</td>
            <td>
              {c.organizations.length ? (
                <StyledList>
                  {c.organizations.map((org) => (
                    <StyledListItem key={org.uid}>{org.name}</StyledListItem>
                  ))}
                </StyledList>
              ) : (
                "None"
              )}
            </td>
          </tr>
          <tr>
            <td>Series</td>
            <td>
              {series.size ? (
                <StyledList>
                  {[...series].map((series, i) => (
                    <StyledListItem key={i}>{series}</StyledListItem>
                  ))}
                </StyledList>
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
      </StyledTable>
    );
  }

  return <div>{comp}</div>;
};

CharacterResultDetail.propTypes = {
  uid: PropTypes.string,
};

export default CharacterResultDetail;
