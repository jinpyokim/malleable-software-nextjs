"""Convert World Atlas countries-110m TopoJSON to a local SVG.
Usage: python3 scripts/build-world-map.py /path/to/countries-110m.json
Source: https://github.com/topojson/world-atlas (Natural Earth data).
"""
import json
import sys
from pathlib import Path
from xml.sax.saxutils import escape

world = json.loads(Path(sys.argv[1]).read_text())
sx, sy = world['transform']['scale']
tx, ty = world['transform']['translate']
arcs = []
for arc in world['arcs']:
    x = y = 0
    points = []
    for dx, dy in arc:
        x += dx
        y += dy
        points.append(((x * sx + tx + 180) / 360 * 1000, (90 - (y * sy + ty)) / 180 * 500))
    arcs.append(points)

paths = []
for country in world['objects']['countries']['geometries']:
    if country.get('id') == '010':
        continue
    polygons = [country['arcs']] if country['type'] == 'Polygon' else country['arcs']
    commands = []
    for polygon in polygons:
        for ring in polygon:
            points = []
            for index in ring:
                segment = arcs[index] if index >= 0 else list(reversed(arcs[~index]))
                points.extend(segment if not points else segment[1:])
            commands.append('M' + 'L'.join(f'{x:.2f},{y:.2f}' for x, y in points) + 'Z')
    paths.append(f'<path d="{"".join(commands)}"><title>{escape(country["properties"]["name"])}</title></path>')
svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500"><g fill="#17344d" stroke="#3a5972" stroke-width="0.65" stroke-linejoin="round">' + ''.join(paths) + '</g></svg>'
Path('public/world-map.svg').write_text(svg)
