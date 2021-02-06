import React, { useState, useCallback, useMemo } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import logo from "../../static/assets/logo.png";
import useSiteMetadata from "./SiteMetadata";

const Navbar = () => {
  const data = useStaticQuery(graphql`
    query NavbarGroupsQuery {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "group" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const { edges: groups } = data.allMarkdownRemark;

  const { title } = useSiteMetadata();

  const [active, setActive] = useState(false);

  const navBarActiveClass = useMemo(() => {
    if (active) return "is-active";
    return "";
  }, [active]);

  const toggleHamburger = useCallback(() => {
    setActive(!active);
  }, [active, setActive]);

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Home">
            <img src={logo} alt={title} />
          </Link>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${navBarActiveClass}`}
            data-target="navMenu"
            onClick={() => toggleHamburger()}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenu" className={`navbar-menu ${navBarActiveClass}`}>
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/blog">
              Blog
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Groups</a>
              <div className="navbar-dropdown">
                {groups.map(({ node: group }) => {
                  return (
                    <Link
                      key={`navbar-group-${group.fields.slug}`}
                      className="navbar-item"
                      to={group.fields.slug}
                    >
                      {group.frontmatter.title}
                    </Link>
                  );
                })}
              </div>
            </div>
            <Link className="navbar-item" to="/programme-timetable">
              Programme Timetable
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
