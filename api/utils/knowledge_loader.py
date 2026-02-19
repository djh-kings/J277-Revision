"""
Knowledge Base Loader
Selects and loads the appropriate markdown files based on mode, unit, and paper/question.
Used by quiz.py and practice.py to assemble API calls with relevant context.
"""

import os

# Base path for knowledge base files (relative to project root on Vercel)
KB_BASE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'knowledge_base')

# Mapping of units to their teaching material filenames
UNIT_TEACHING_FILES = {
    '1.1': 'unit_1_1_systems_architecture.md',
    '1.2': 'unit_1_2_memory_and_storage.md',
    '1.3': 'unit_1_3_networks_connections_protocols.md',
}

# Specification file covers all three units
SPEC_FILE = 'j277_spec_1_1_to_1_3.md'


def _read_file(filepath):
    """Read a file and return its contents, or empty string if not found."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"[knowledge_loader] File not found: {filepath}")
        return ''
    except Exception as e:
        print(f"[knowledge_loader] Error reading {filepath}: {e}")
        return ''


def load_quiz_context(unit):
    """
    Load knowledge base files for Quiz Mode.
    
    For a quiz session, we need:
    - The specification content (filtered to relevant unit ideally, but full file is small enough)
    - The teaching material for the selected unit
    
    Args:
        unit: str — '1.1', '1.2', or '1.3'
    
    Returns:
        str — combined knowledge base content with clear section markers
    """
    if unit not in UNIT_TEACHING_FILES:
        return f"[Error: Unknown unit '{unit}'. Valid units are 1.1, 1.2, 1.3]"
    
    sections = []
    
    # Load specification
    spec_content = _read_file(os.path.join(KB_BASE, 'spec', SPEC_FILE))
    if spec_content:
        sections.append(f"<specification>\n{spec_content}\n</specification>")
    
    # Load teaching material for this unit
    teaching_file = UNIT_TEACHING_FILES[unit]
    teaching_content = _read_file(os.path.join(KB_BASE, 'teaching', teaching_file))
    if teaching_content:
        sections.append(f"<teaching_material unit=\"{unit}\">\n{teaching_content}\n</teaching_material>")
    
    return '\n\n'.join(sections)


def load_practice_context(paper, question_id):
    """
    Load knowledge base files for Exam Practice Mode.
    
    For a practice session, we need:
    - The mark scheme for the selected paper
    - The examiner report for the selected paper
    - The question text for the selected paper
    - The teaching material for the relevant unit
    
    Args:
        paper: str — '2023' or '2024'
        question_id: str — the question number (e.g. '1', '2')
    
    Returns:
        str — combined knowledge base content with clear section markers
    """
    sections = []
    
    # Load mark scheme
    ms_path = os.path.join(KB_BASE, 'mark_schemes', f'j277_01_{paper}_mark_scheme.md')
    ms_content = _read_file(ms_path)
    if ms_content:
        sections.append(f"<mark_scheme paper=\"{paper}\">\n{ms_content}\n</mark_scheme>")
    
    # Load examiner report
    er_path = os.path.join(KB_BASE, 'examiner_reports', f'j277_01_{paper}_examiner_report.md')
    er_content = _read_file(er_path)
    if er_content:
        sections.append(f"<examiner_report paper=\"{paper}\">\n{er_content}\n</examiner_report>")
    
    # Load question paper text
    qp_path = os.path.join(KB_BASE, 'papers', f'j277_01_{paper}_questions.md')
    qp_content = _read_file(qp_path)
    if qp_content:
        sections.append(f"<question_paper paper=\"{paper}\">\n{qp_content}\n</question_paper>")
    
    # Load specification
    spec_content = _read_file(os.path.join(KB_BASE, 'spec', SPEC_FILE))
    if spec_content:
        sections.append(f"<specification>\n{spec_content}\n</specification>")
    
    return '\n\n'.join(sections)
