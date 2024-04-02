<?php
// Exécution de la commande
$cmd = "sudo cat /etc/squid/squid.conf |grep -v ^#|grep [a-zA-Z0-9]| grep -v '^refresh\\|^acl\\|^http_access\\|^include\\|^url_rewrite_program\\|^core' | sed -e 's/always_direct/une_liste_URL_que_Squid_doit_toujours_télécharger_directement,_sans_les_mettre_en_cache/g' -e 's/visible_hostname/le_nom_dhôte_que_Squid_affiche_aux_clients/g' -e 's/maximum_object_size_in_memory/la_taille_maximale_des_objets_que_Squid_peut_mettre_en_cache/g' -e 's/cache_dir/le_répertoire_où_Squid_stocke_les_fichiers_mis_en_cache/g' -e 's/http_port/le_port_TCP_sur_lequel_Squid_écoute_les_requêtes_HTTP./g' -e 's/logformat/le_format_des_fichiers_journaux_de_Squid/g' -e 's/reply_body_max_size/taille_du_telechargement_maximum/g'";
$output = shell_exec($cmd);

// Préparation des résultats
$lines = explode("\n", $output);
$results = array_map(function($line) {
    $parts = explode(' ', $line, 2);
    if (count($parts) >= 2) {
        $key = str_replace('_', ' ', $parts[0]);
        $value = $parts[1];
        return "$key : $value";
    }
    return '';
}, $lines);

// Renvoi des résultats au format JSON
header('Content-Type: application/json');
echo json_encode($results);

