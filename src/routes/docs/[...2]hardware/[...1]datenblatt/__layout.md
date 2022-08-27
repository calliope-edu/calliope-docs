
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

<table>
    <thead>
        <tr>
          <th></th>
          <th>Haus A</th>
          <th>Haus B</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <th>Wohnfläche</th>
          <td>100</td>
          <td>150</td>
        </tr>
        <tr>
          <th>Gartenfläche</th>
          <td>50</td>
          <td>100</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
          <th>Gesamtfläche</th>
          <td>150</td>
          <td>250</td>
        </tr>
        <tr>
          <td colspan="3">Alle Angaben in Quadratmetern.</td>
        </tr>
    </tfoot>
</table>

<TabbedLinks {links} />

<slot />

