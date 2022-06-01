
# {$frontmatter.title}

Datenblatt für Calliope mini {$frontmatter.description}.

Hier Tabelle Vergleich

<script>

  const libs = ['v2', 'v1.3', 'v0.3'];

  let links = libs
    .map(lib => ({ 
      title: lib, 
      href: `/docs/hardware/datenblatt/${lib}` 
    }));
</script>

<TabbedLinks {links} />


<slot />