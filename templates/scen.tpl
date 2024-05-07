from manim import *

class Scenario(Scene):
    def construct(self):
        {% for node in nodes -%}
            {% if node.type == "RectangleNode" %} 
            {{node.type}}_{{node.id}} = Rectangle()
            {% endif %}

            {% for edge in edges -%}

            {% if edge.source == node.id %} 
            self.play(FadeIn( {{node.type}}_{{node.id}} ))
            {% endif %}

            {% endfor %}
        {% endfor %}