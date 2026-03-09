# Omido Claude Code Redesign Kit

Dit pakket is bedoeld om `omido.nl` volledig te herontwerpen met Claude Code via een gestructureerd multi-agent systeem.

## Inhoud

- `MASTER_PROMPT.md` — hoofdopdracht voor Claude Code
- `CLAUDE.md` — persistente projectinstructies
- `.claude/agents/` — specialistische subagents
- `.claude/skills/` — herbruikbare redesign-workflows
- `.claude/output-styles/ultra-premium-redesign.md` — custom output style
- `.claude/settings.json` — aanbevolen projectinstellingen
- `OMIDO_LIVE_SITE_AUDIT.md` — korte audit van de huidige site

## Installatie in je repo

1. Kopieer **alle bestanden en mappen** uit deze kit naar de root van je Omido-project.
2. Open daarna Claude Code in die projectmap.
3. Selecteer indien gewenst de output style:
   - `/output-style ultra-premium-redesign`
4. Start daarna met de master prompt uit `MASTER_PROMPT.md`.

## Aanbevolen volgorde

1. Audit van huidige site
2. Positionering + IA + page strategy
3. Visual system + motion system
4. Copy + proof + conversion layer
5. Implementatie in codebase
6. Performance/accessibility pass
7. Final QA/polish

## Opmerking

Deze kit is gemaakt voor Claude Code project-level gebruik:
- `CLAUDE.md` in de project root
- subagents in `.claude/agents/`
- skills in `.claude/skills/<skill-name>/SKILL.md`
- output styles in `.claude/output-styles/`
