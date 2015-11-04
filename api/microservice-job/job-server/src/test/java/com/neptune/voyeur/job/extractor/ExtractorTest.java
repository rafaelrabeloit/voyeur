package com.neptune.voyeur.job.extractor;

import junit.framework.TestCase;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.Test;

import com.neptune.voyeur.job.extractor.Extractor;

public class ExtractorTest extends TestCase {

	private Document document;
	public String case1 = "<html>                                                                             "
			+ "<head>                                                                                         "
			+ "</head>                                                                                        "
			+ "<body>                                                                                         "
			+ "  <table width=\"93%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"fundo-table2\">"
			+ "                                                                                               "
			+ "    <tbody><tr>                                                                                "
			+ "      <td width=\"5%\" class=\"td_left\">&nbsp;</td>                                           "
			+ "      <td width=\"31%\" height=\"18\" class=\"td_left\">01                                     "
			+ "        de                                                                                     "
			+ "        janeiro  </td>                                                                         "
			+ "      <td width=\"18%\" class=\"td_left\">(                                                    "
			+ "          Sexta                                                                                "
			+ "        )                                                                                      "
			+ "        </td>                                                                                  "
			+ "      <td width=\"46%\" class=\"td_left\">Dia Mundial da Paz</td>                              "
			+ "    </tr>                                                                                      "
			+ "                                                                                               "
			+ "    <tr>                                                                                       "
			+ "      <td width=\"5%\" class=\"td_left\">&nbsp;</td>                                           "
			+ "      <td width=\"31%\" height=\"18\" class=\"td_left\">08                                     "
			+ "        de                                                                                     "
			+ "        fevereiro</td>                                                                         "
			+ "      <td width=\"18%\" class=\"td_left\">(                                                    "
			+ "          Segunda                                                                              "
			+ "        )                                                                                      "
			+ "        </td>                                                                                  "
			+ "      <td width=\"46%\" class=\"td_left\">Carnaval</td>                                        "
			+ "    </tr>                                                                                      "
			+ "                                                                                               "
			+ "    <tr>                                                                                       "
			+ "      <td width=\"5%\" class=\"td_left\">&nbsp;</td>                                           "
			+ "      <td width=\"31%\" height=\"18\" class=\"td_left\">09                                     "
			+ "        de                                                                                     "
			+ "        fevereiro</td>                                                                         "
			+ "      <td width=\"18%\" class=\"td_left\">(                                                    "
			+ "          Terça                                                                                "
			+ "        )                                                                                      "
			+ "        </td>                                                                                  "
			+ "      <td width=\"46%\" class=\"td_left\">Carnaval</td>                                        "
			+ "    </tr>                                                                                      "
			+ "                                                                                               "
			+ "    <tr>                                                                                       "
			+ "      <td width=\"5%\" class=\"td_left\">&nbsp;</td>                                           "
			+ "      <td width=\"31%\" height=\"18\" class=\"td_left\">25                                     "
			+ "        de                                                                                     "
			+ "        março    </td>                                                                         "
			+ "      <td width=\"18%\" class=\"td_left\">(                                                    "
			+ "          Sexta                                                                                "
			+ "        )                                                                                      "
			+ "        </td>                                                                                  "
			+ "      <td width=\"46%\" class=\"td_left\">Sexta-Feira da Paixão</td>                           "
			+ "    </tr>                                                                                      "
			+ "                                                                                               "
			+ "    <tr>                                                                                       "
			+ "      <td width=\"5%\" class=\"td_left\">&nbsp;</td>                                           "
			+ "      <td width=\"31%\" height=\"18\" class=\"td_left\">21                                     "
			+ "        de                                                                                     "
			+ "        abril    </td>                                                                         "
			+ "      <td width=\"18%\" class=\"td_left\">(                                                    "
			+ "          Quinta                                                                               "
			+ "        )                                                                                      "
			+ "        </td>                                                                                  "
			+ "      <td width=\"46%\" class=\"td_left\">Tiradentes</td>                                      "
			+ "    </tr>                                                                                      "
			+ "                                                                                               "
			+ "    <tr>                                                                                       "
			+ "      <td width=\"5%\" class=\"td_left\">&nbsp;</td>                                           "
			+ "      <td width=\"31%\" height=\"18\" class=\"td_left\">01                                     "
			+ "        de                                                                                     "
			+ "        maio     </td>                                                                         "
			+ "      <td width=\"18%\" class=\"td_left\">(                                                    "
			+ "          Domingo                                                                              "
			+ "        )                                                                                      "
			+ "        </td>                                                                                  "
			+ "      <td width=\"46%\" class=\"td_left\">Dia do Trabalho</td>                                 "
			+ "    </tr>                                                                                      "
			+ "                                                                                               "
			+ "    <tr>                                                                                       "
			+ "      <td width=\"5%\" class=\"td_left\">&nbsp;</td>                                           "
			+ "      <td width=\"31%\" height=\"18\" class=\"td_left\">26                                     "
			+ "        de                                                                                     "
			+ "        junho    </td>                                                                         "
			+ "      <td width=\"18%\" class=\"td_left\">(                                                    "
			+ "          Domingo                                                                              "
			+ "        )                                                                                      "
			+ "        </td>                                                                                  "
			+ "      <td width=\"46%\" class=\"td_left\">Corpus Christi</td>                                  "
			+ "    </tr>                                                                                      "
			+ "                                                                                               "
			+ "    <tr>                                                                                       "
			+ "      <td width=\"5%\" class=\"td_left\">&nbsp;</td>                                           "
			+ "      <td width=\"31%\" height=\"18\" class=\"td_left\">07                                     "
			+ "        de                                                                                     "
			+ "        setembro </td>                                                                         "
			+ "      <td width=\"18%\" class=\"td_left\">(                                                    "
			+ "          Quarta                                                                               "
			+ "        )                                                                                      "
			+ "        </td>                                                                                  "
			+ "      <td width=\"46%\" class=\"td_left\">Independência do Brasil</td>                         "
			+ "    </tr>                                                                                      "
			+ "                                                                                               "
			+ "    <tr>                                                                                       "
			+ "      <td width=\"5%\" class=\"td_left\">&nbsp;</td>                                           "
			+ "      <td width=\"31%\" height=\"18\" class=\"td_left\">12                                     "
			+ "        de                                                                                     "
			+ "        outubro  </td>                                                                         "
			+ "      <td width=\"18%\" class=\"td_left\">(                                                    "
			+ "          Quarta                                                                               "
			+ "        )                                                                                      "
			+ "        </td>                                                                                  "
			+ "      <td width=\"46%\" class=\"td_left\">Nossa Srª Aparecida</td>                             "
			+ "    </tr>                                                                                      "
			+ "                                                                                               "
			+ "    <tr>                                                                                       "
			+ "      <td width=\"5%\" class=\"td_left\">&nbsp;</td>                                           "
			+ "      <td width=\"31%\" height=\"18\" class=\"td_left\">02                                     "
			+ "        de                                                                                     "
			+ "        novembro </td>                                                                         "
			+ "      <td width=\"18%\" class=\"td_left\">(                                                    "
			+ "          Quarta                                                                               "
			+ "        )                                                                                      "
			+ "        </td>                                                                                  "
			+ "      <td width=\"46%\" class=\"td_left\">Finados</td>                                         "
			+ "    </tr>                                                                                      "
			+ "                                                                                               "
			+ "    <tr>                                                                                       "
			+ "      <td width=\"5%\" class=\"td_left\">&nbsp;</td>                                           "
			+ "      <td width=\"31%\" height=\"18\" class=\"td_left\">15                                     "
			+ "        de                                                                                     "
			+ "        novembro </td>                                                                         "
			+ "      <td width=\"18%\" class=\"td_left\">(                                                    "
			+ "          Terça                                                                                "
			+ "        )                                                                                      "
			+ "        </td>                                                                                  "
			+ "      <td width=\"46%\" class=\"td_left\">Proclamação da República</td>                        "
			+ "    </tr>                                                                                      "
			+ "                                                                                               "
			+ "    <tr>                                                                                       "
			+ "      <td width=\"5%\" class=\"td_left\">&nbsp;</td>                                           "
			+ "      <td width=\"31%\" height=\"18\" class=\"td_left\">25                                     "
			+ "        de                                                                                     "
			+ "        dezembro</td>                                                                          "
			+ "      <td width=\"18%\" class=\"td_left\">(                                                    "
			+ "          Domingo                                                                              "
			+ "        )                                                                                      "
			+ "        </td>                                                                                  "
			+ "      <td width=\"46%\" class=\"td_left\">Natal</td>                                           "
			+ "    </tr>                                                                                      "
			+ "                                                                                               "
			+ "  </tbody></table>                                                                             "
			+ "</body>                                                                                        "
			+ "</html>                                                                                        ";

	public ExtractorTest() {
		this.document = Jsoup.parse(case1);
	}

	@Test
	public void test_extract_oneRoot() {

		Extractor extractor = new Extractor(this.document,
				".fundo-table2");
		
		assertEquals(
				"[[[[\" \"],[\"01 de janeiro\"],[\"( Sexta )\"],[\"Dia Mundial da Paz\"]],[[\" \"],[\"08 de fevereiro\"],[\"( Segunda )\"],[\"Carnaval\"]],[[\" \"],[\"09 de fevereiro\"],[\"( Terça )\"],[\"Carnaval\"]],[[\" \"],[\"25 de março\"],[\"( Sexta )\"],[\"Sexta-Feira da Paixão\"]],[[\" \"],[\"21 de abril\"],[\"( Quinta )\"],[\"Tiradentes\"]],[[\" \"],[\"01 de maio\"],[\"( Domingo )\"],[\"Dia do Trabalho\"]],[[\" \"],[\"26 de junho\"],[\"( Domingo )\"],[\"Corpus Christi\"]],[[\" \"],[\"07 de setembro\"],[\"( Quarta )\"],[\"Independência do Brasil\"]],[[\" \"],[\"12 de outubro\"],[\"( Quarta )\"],[\"Nossa Srª Aparecida\"]],[[\" \"],[\"02 de novembro\"],[\"( Quarta )\"],[\"Finados\"]],[[\" \"],[\"15 de novembro\"],[\"( Terça )\"],[\"Proclamação da República\"]],[[\" \"],[\"25 de dezembro\"],[\"( Domingo )\"],[\"Natal\"]]]]",
				extractor.extract());

	}

	@Test
	public void test_extract_multipleRoots() {

		Extractor extractor = new Extractor(this.document,
				".fundo-table2 tbody");
		
		assertEquals(
				"[[[\" \"],[\"01 de janeiro\"],[\"( Sexta )\"],[\"Dia Mundial da Paz\"]],[[\" \"],[\"08 de fevereiro\"],[\"( Segunda )\"],[\"Carnaval\"]],[[\" \"],[\"09 de fevereiro\"],[\"( Terça )\"],[\"Carnaval\"]],[[\" \"],[\"25 de março\"],[\"( Sexta )\"],[\"Sexta-Feira da Paixão\"]],[[\" \"],[\"21 de abril\"],[\"( Quinta )\"],[\"Tiradentes\"]],[[\" \"],[\"01 de maio\"],[\"( Domingo )\"],[\"Dia do Trabalho\"]],[[\" \"],[\"26 de junho\"],[\"( Domingo )\"],[\"Corpus Christi\"]],[[\" \"],[\"07 de setembro\"],[\"( Quarta )\"],[\"Independência do Brasil\"]],[[\" \"],[\"12 de outubro\"],[\"( Quarta )\"],[\"Nossa Srª Aparecida\"]],[[\" \"],[\"02 de novembro\"],[\"( Quarta )\"],[\"Finados\"]],[[\" \"],[\"15 de novembro\"],[\"( Terça )\"],[\"Proclamação da República\"]],[[\" \"],[\"25 de dezembro\"],[\"( Domingo )\"],[\"Natal\"]]]",
				extractor.extract());

	}
	
	@Test
	public void test_extract_noRoot() {

		Extractor extractor = new Extractor(this.document,
				".fundo-table2 td");
		
		assertEquals(
				"[\" \",\"01 de janeiro\",\"( Sexta )\",\"Dia Mundial da Paz\",\" \",\"08 de fevereiro\",\"( Segunda )\",\"Carnaval\",\" \",\"09 de fevereiro\",\"( Terça )\",\"Carnaval\",\" \",\"25 de março\",\"( Sexta )\",\"Sexta-Feira da Paixão\",\" \",\"21 de abril\",\"( Quinta )\",\"Tiradentes\",\" \",\"01 de maio\",\"( Domingo )\",\"Dia do Trabalho\",\" \",\"26 de junho\",\"( Domingo )\",\"Corpus Christi\",\" \",\"07 de setembro\",\"( Quarta )\",\"Independência do Brasil\",\" \",\"12 de outubro\",\"( Quarta )\",\"Nossa Srª Aparecida\",\" \",\"02 de novembro\",\"( Quarta )\",\"Finados\",\" \",\"15 de novembro\",\"( Terça )\",\"Proclamação da República\",\" \",\"25 de dezembro\",\"( Domingo )\",\"Natal\"]",
				extractor.extract());

	}
}