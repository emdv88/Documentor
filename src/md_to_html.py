import re


ugly_md_text = """
# Lorum Ipsum
  
## What is Lorem Ipsum?

   Lorem Ipsum is simply dummy text of the printing and typesetting industry.   
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
   when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
  It has survived not only five centuries, but also the leap into electronic typesetting, 
remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
Aldus PageMaker including versions of Lorem Ipsum.


## Why do we use it?

It is a long established fact that a reader will be distracted by the readable content of a 
page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less 
normal distribution of letters, as opposed to using 'Content here, content here', making it look 
like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as
 their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their
  infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
(injected humour and the like).

## Where does it come from?

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
 Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
  Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
   Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
    undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
     (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
      very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", 
      comes from a line in section 1.10.32.

"""

def sanitize(string):
    stack = []
    paragraph = ''
    for aaa in  string.split('\n'):
        zzz = aaa.strip()
        if not zzz: continue
        if zzz[0]=='#':
            match = re.match('(#+)(.*)',zzz)
            hlevel = len(match.group(1))
            # Append the paragraph collected up to now.
            if paragraph:
                stack.append(('p', paragraph.strip(), 1))
                paragraph = ''
            
            stack.append((f'h{hlevel}',match.group(2).strip(), 1))
        else:
            paragraph += (' ' + zzz)
    if paragraph:
        stack.append(('p',paragraph.strip(), 1))
    return stack


def to_html_body(stack):
    html = []
    for element, text, indent in stack:
        indents = "" # "\t"*indent
        html.append(f'{indents}<{element}>{text}</{element}>')
    html = '\n'.join(html)
    return html

def to_html_toc(stack):
    html = []
    for element, text, indent in stack:
        pass
    return 'Not yet implemented'


stack = sanitize(ugly_md_text)
html_body = to_html_body(stack)
html_toc = to_html_toc(stack)

with open('src/stack_edit.html', 'r') as f:
    content = f.read()


with open('src/uml.html','r') as f:
    uml_html = f.read()


mod_content = re.sub(r'{{{files.0.content.html}}}', html_body, content)
mod_content = re.sub(r'{{#tocToHtml files.0.content.toc 2}}{{/tocToHtml}}', html_toc, mod_content)
mod_content = re.sub(r'{{insert uml}}', uml_html, mod_content)


with open('md_to_html.html', 'w') as f:
    f.write(mod_content)
