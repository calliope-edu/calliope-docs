<footer>
    <div class="ui container">
        <span class="copyright">
            © {new Date().getFullYear()} <a href="https://calliope.cc">Calliope gGmbH</a>.
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

        @media (max-width: 1280px) { 
            padding-bottom: 3.5rem;
        }

        a {
            color: #ffffff;
            transition: all 0.2s ease;

            &:hover {
                text-decoration: underline;
                opacity: 0.9;
            }
        }

        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            
            li {
                display: block;
                
                a {
                    display: block;
                    padding: 0.5rem 1rem;
                    white-space: nowrap;
                    
                    @media (max-width: 767px) {
                        padding: 0.625rem 0.5rem;
                    }
                }
            }
        }

        .container {
            padding: 2rem 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;

            @media (min-width: 768px) { 
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                gap: 2rem;
            }

            .copyright {
                font-size: 0.875rem;
                line-height: 1.5;
                color: #ffffff;
                text-align: center;
                
                @media (min-width: 768px) { 
                    text-align: left;
                }
            }

            .menu {
                display: flex;
                flex-wrap: nowrap;
                justify-content: center;
                align-items: center;
                gap: 0;
                margin: 0;
                
                @media (min-width: 768px) { 
                    justify-content: flex-end;
                    margin-left: auto;
                }
                
                li {
                    display: inline-flex;
                    align-items: center;
                    
                    &:not(:last-child)::after {
                        content: '|';
                        color: rgba(255, 255, 255, 0.5);
                        padding: 0 0.75rem;
                        display: inline-block;
                        
                        @media (max-width: 767px) {
                            padding: 0 0.5rem;
                        }
                    }
                }
            }
        }
    }
</style>