<footer>
    <div class="ui container">
        <span class="copyright">
            © {new Date().getFullYear()} <a href="https://calliope.cc">Calliope gGmbH</a>. All Rights Reserved.
        </span>
        <ul class="menu">
                <li>
                    <a href="https://calliope.cc/impressum" target="_blank">Impressum</a>
                </li>
                <li>
                    <a href="https://calliope.cc/dataprotection" target="_blank">Datenschutz</a>
                </li>
        </ul>
    </div>
</footer>

<style lang="scss">
    footer {
        position: relative; 
        z-index: 30;

        margin-top: 4rem;
        background-color: var(--color-calliope);


        a {
            color: #ffffff;

            &:hover {
                text-decoration: underline;
            }
        }

        ul {
            list-style-type: none;
            li {
                display: block;
                a {
                    padding: 1rem;

                }
            }
        }

        .container {
            padding-left: 1rem;
            padding-right: 1rem; 
            padding-top: 1.5rem;
            padding-bottom: 1.5rem; 

            @media (min-width: 768px) { 
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }

            .copyright {
                font-size: 0.875rem;
                line-height: 1.25rem; 
                color: #ffffff; 

                @media (min-width: 640px) { 
                    text-align: center; 
                }
            }

            .menu {
                display: flex; 
                margin-top: 1rem; 
                margin-left: 1.5rem; 

                @media (min-width: 640px) { 
                justify-content: center; 
                }
                @media (min-width: 768px) { 
                margin-top: 0; 
                }
            }
        }
    }
</style>